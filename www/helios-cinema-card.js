import {
  LitElement,
  html,
  css,
} from "lit";
import { customElement, property, state } from "lit/decorators.js";

@customElement("helios-cinema-card")
export class HeliosCinemaCard extends LitElement {
  @property({ attribute: false }) hass;
  @state() config;
  @state() currentFilmIndex = 0;
  @state() isManualMode = false;
  @state() films = [];
  
  autoRotateInterval;
  manualTimeoutId;

  static async getConfigElement() {
    return document.createElement("helios-cinema-card-editor");
  }

  static getStubConfig() {
    return {
      type: "custom:helios-cinema-card",
      entity: "sensor.helios_cinema_films",
      name: "Cinema Films",
      auto_rotate: true,
      rotate_interval: 5000,
      manual_timeout: 30000,
    };
  }

  setConfig(config) {
    if (!config) {
      throw new Error("Invalid configuration");
    }
    if (!config.entity) {
      throw new Error("You need to define an entity");
    }
    this.config = {
      auto_rotate: true,
      rotate_interval: 5000,
      manual_timeout: 30000,
      ...config,
    };
  }

  shouldUpdate(changedProps) {
    if (!this.config) {
      return false;
    }
    return changedProps.has("hass") || changedProps.has("config");
  }

  updated(changedProps) {
    super.updated(changedProps);
    
    if (changedProps.has("hass") && this.hass) {
      const entity = this.hass.states[this.config.entity];
      if (entity && entity.attributes.films) {
        this.films = entity.attributes.films;
        if (this.currentFilmIndex >= this.films.length) {
          this.currentFilmIndex = 0;
        }
      }
    }

    if (this.config.auto_rotate && !this.isManualMode) {
      this.startAutoRotate();
    }
  }

  startAutoRotate() {
    this.stopAutoRotate();
    if (this.films.length > 1) {
      this.autoRotateInterval = setInterval(() => {
        this.nextFilm();
      }, this.config.rotate_interval);
    }
  }

  stopAutoRotate() {
    if (this.autoRotateInterval) {
      clearInterval(this.autoRotateInterval);
      this.autoRotateInterval = null;
    }
  }

  nextFilm() {
    if (this.films.length > 0) {
      this.currentFilmIndex = (this.currentFilmIndex + 1) % this.films.length;
    }
  }

  previousFilm() {
    if (this.films.length > 0) {
      this.currentFilmIndex = this.currentFilmIndex === 0 
        ? this.films.length - 1 
        : this.currentFilmIndex - 1;
    }
  }

  handleCardClick() {
    if (!this.isManualMode) {
      this.isManualMode = true;
      this.stopAutoRotate();
    }
    
    this.nextFilm();
    this.resetManualTimeout();
  }

  resetManualTimeout() {
    if (this.manualTimeoutId) {
      clearTimeout(this.manualTimeoutId);
    }
    
    this.manualTimeoutId = setTimeout(() => {
      this.isManualMode = false;
      if (this.config.auto_rotate) {
        this.startAutoRotate();
      }
    }, this.config.manual_timeout);
  }

  handlePrevious(e) {
    e.stopPropagation();
    this.isManualMode = true;
    this.stopAutoRotate();
    this.previousFilm();
    this.resetManualTimeout();
  }

  handleNext(e) {
    e.stopPropagation();
    this.isManualMode = true;
    this.stopAutoRotate();
    this.nextFilm();
    this.resetManualTimeout();
  }

  formatShowtimes(showtimes) {
    return showtimes && showtimes.length > 0 ? showtimes.join(", ") : "No showtimes available";
  }

  getCurrentFilm() {
    return this.films.length > 0 ? this.films[this.currentFilmIndex] : null;
  }

  render() {
    if (!this.config || !this.hass) {
      return html``;
    }

    const entity = this.hass.states[this.config.entity];
    if (!entity) {
      return html`
        <ha-card>
          <div class="warning">Entity not available: ${this.config.entity}</div>
        </ha-card>
      `;
    }

    const currentFilm = this.getCurrentFilm();
    if (!currentFilm) {
      return html`
        <ha-card>
          <div class="no-films">No films available</div>
        </ha-card>
      `;
    }

    return html`
      <ha-card @click=${this.handleCardClick}>
        <div class="card-header">
          <div class="name">${this.config.name || "Cinema Films"}</div>
          <div class="film-counter">${this.currentFilmIndex + 1} / ${this.films.length}</div>
        </div>
        
        <div class="film-container">
          <div class="film-image">
            <img src="${currentFilm.image}" alt="${currentFilm.title}" />
            <div class="navigation-buttons">
              <button class="nav-button prev" @click=${this.handlePrevious}>‹</button>
              <button class="nav-button next" @click=${this.handleNext}>›</button>
            </div>
          </div>
          
          <div class="film-info">
            <h2 class="film-title">${currentFilm.title}</h2>
            <p class="film-description">${currentFilm.description}</p>
            
            <div class="showtimes">
              <div class="showtime-section">
                <h3>Today</h3>
                <div class="times">${this.formatShowtimes(currentFilm.showtimes_today)}</div>
              </div>
              <div class="showtime-section">
                <h3>Tomorrow</h3>
                <div class="times">${this.formatShowtimes(currentFilm.showtimes_tomorrow)}</div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="card-footer">
          <div class="mode-indicator">
            ${this.isManualMode ? "Manual Mode" : "Auto Rotate"}
          </div>
          <div class="dots">
            ${this.films.map((_, index) => html`
              <span class="dot ${index === this.currentFilmIndex ? 'active' : ''}"></span>
            `)}
          </div>
        </div>
      </ha-card>
    `;
  }

  static get styles() {
    return css`
      ha-card {
        cursor: pointer;
        overflow: hidden;
        transition: transform 0.2s ease;
      }
      
      ha-card:hover {
        transform: translateY(-2px);
      }
      
      .warning,
      .no-films {
        padding: 20px;
        text-align: center;
        color: var(--warning-color, #ff9800);
      }
      
      .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px;
        background: var(--primary-color);
        color: white;
      }
      
      .name {
        font-size: 1.2em;
        font-weight: bold;
      }
      
      .film-counter {
        font-size: 0.9em;
        opacity: 0.8;
      }
      
      .film-container {
        display: flex;
        min-height: 300px;
      }
      
      .film-image {
        position: relative;
        flex: 0 0 200px;
        overflow: hidden;
      }
      
      .film-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      
      .navigation-buttons {
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        transform: translateY(-50%);
        display: flex;
        justify-content: space-between;
        opacity: 0;
        transition: opacity 0.3s ease;
      }
      
      .film-image:hover .navigation-buttons {
        opacity: 1;
      }
      
      .nav-button {
        background: rgba(0, 0, 0, 0.7);
        color: white;
        border: none;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        cursor: pointer;
        font-size: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 10px;
      }
      
      .nav-button:hover {
        background: rgba(0, 0, 0, 0.9);
      }
      
      .film-info {
        flex: 1;
        padding: 16px;
        display: flex;
        flex-direction: column;
      }
      
      .film-title {
        margin: 0 0 12px 0;
        font-size: 1.4em;
        color: var(--primary-text-color);
      }
      
      .film-description {
        margin: 0 0 16px 0;
        color: var(--secondary-text-color);
        line-height: 1.4;
        flex: 1;
      }
      
      .showtimes {
        margin-top: auto;
      }
      
      .showtime-section {
        margin-bottom: 8px;
      }
      
      .showtime-section h3 {
        margin: 0 0 4px 0;
        font-size: 0.9em;
        color: var(--primary-color);
        text-transform: uppercase;
        font-weight: bold;
      }
      
      .times {
        font-size: 0.9em;
        color: var(--secondary-text-color);
      }
      
      .card-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 16px;
        background: var(--card-background-color);
        border-top: 1px solid var(--divider-color);
      }
      
      .mode-indicator {
        font-size: 0.8em;
        color: var(--secondary-text-color);
      }
      
      .dots {
        display: flex;
        gap: 6px;
      }
      
      .dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: var(--disabled-text-color);
        transition: background 0.3s ease;
      }
      
      .dot.active {
        background: var(--primary-color);
      }
      
      @media (max-width: 600px) {
        .film-container {
          flex-direction: column;
        }
        
        .film-image {
          flex: 0 0 200px;
        }
      }
    `;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.stopAutoRotate();
    if (this.manualTimeoutId) {
      clearTimeout(this.manualTimeoutId);
    }
  }
}
