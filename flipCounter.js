/**
 * Flip counter module for displaying date and time countdown.
 */
class FlipCounter {
  /**
   * Handle flip all cards segments.
   * 
   * @param {number} countToDate Nubmer of hours to countdown.
   * @param {string} rootElementSelector Unique root element insert the flip counter.
   */
  constructor(countToDate, rootElementSelector) {
    this.uniqueKey = this.getUniqueKey(rootElementSelector);

    setInterval(() => {

      const currentDate = new Date();
      const timeRemaining = Math.ceil((countToDate - currentDate) / 1000);


      this.renderHtmlTemplate(rootElementSelector, this.uniqueKey);

      this.invoke(timeRemaining);
    }, 250);
  }

  /**
   * Invoke class handler. 
   * 
   * @param {number} time Date tim in number format.
   */
  invoke(time) {
    const seconds = time % 60;
    const minutes = Math.floor(time / 60) % 60;
    const hours = Math.floor(time / (60 * 60)) % 24;
    const days = Math.floor(time / (60 * 60 * 24));


    if (days) {
      this.flip(this.getSegment(this.uniqueKey, 'days', 'tens'), Math.floor(days / 10));
      this.flip(this.getSegment(this.uniqueKey, 'days', 'ones'), days % 10);
    } else {
      this.getSegment(this.uniqueKey, 'days', 'ones')
        .parentElement.parentElement.style.display = 'none';

      document.querySelector(`.separator.hours`).style.display = 'none';
    }

    this.flip(this.getSegment(this.uniqueKey, 'hours', 'tens'), Math.floor(hours / 10));
    this.flip(this.getSegment(this.uniqueKey, 'hours', 'ones'), hours % 10);

    this.flip(this.getSegment(this.uniqueKey, 'minutes', 'tens'), Math.floor(minutes / 10));
    this.flip(this.getSegment(this.uniqueKey, 'minutes', 'ones'), minutes % 10);

    this.flip(this.getSegment(this.uniqueKey, 'seconds', 'tens'), Math.floor(seconds / 10));
    this.flip(this.getSegment(this.uniqueKey, 'seconds', 'ones'), seconds % 10);
  }

  /**
   * Get unique key with the identifier. 
   * 
   * @param {string} identifier Poluted string to convert.
   * 
   * @returns string
   */
  getUniqueKey(identifier) {
    return identifier.replace(/[^a-z]/gi, '').toLowerCase();
  }

  /**
   * Get a specific segment of the counter. 
   * 
   * @param {string} prefix Prefix of the segment data attribute.
   * @param {string} type segment type.
   * @param {string} segmentName name of the segment.
   * @returns HtmlNodeElement
   */
  getSegment(prefix, type, segmentName) {
    return document.querySelector(`[data-${prefix}-${type}-${segmentName}]`);
  }

  /**
   * Flip segment handler.
   * 
   * @param {HTMLElement} flipCard html flip segment
   * @param {number} newNumber new number
   * 
   * @returns void
   */
  flip(flipCard, newNumber) {
    const topHalf = flipCard.querySelector('.top');
    const startNumber = parseInt(topHalf.textContent);

    if (newNumber === startNumber) return;

    const bottomHalf = flipCard.querySelector('.bottom');

    const topFlip = document.createElement('div');
    topFlip.classList.add('top-flip');

    const bottomFlip = document.createElement('div');
    bottomFlip.classList.add('bottom-flip');

    top.textContent = startNumber;
    bottomHalf.textContent = startNumber;
    topFlip.textContent = startNumber;
    bottomFlip.textContent = newNumber;

    topFlip.addEventListener('animationstart',
      () => (topHalf.textContent = newNumber));

    topFlip.addEventListener('animationend', () => topFlip.remove())

    bottomFlip.addEventListener('animationend', () => {
      bottomHalf.textContent = newNumber;
      bottomFlip.remove();
    })

    flipCard.append(topFlip, bottomFlip);
  }

  /**
   * Render html template.
   * 
   * @param {string} flipCounterRoot Root element to render flip counter.
   * @param {string} uniqueKey Unique key identifire.
   * @returns HTMLDivElement | false
   */
  renderHtmlTemplate(flipCounterRoot, uniqueKey) {
    let rootNode = document.querySelector(flipCounterRoot);

    if (!rootNode.innerHTML.trim() == "") return false;

    rootNode.classList.add(`${uniqueKey}-flip-counter`);

    const segmentsData = [{
      type: 'days',
      label: 'Days'
    }, {
      type: 'hours',
      label: 'Hours'
    }, {
      type: 'minutes',
      label: 'Minutes'
    }, {
      type: 'seconds',
      label: 'Seconds'
    }]

    const container = document.createElement('div');
    container.classList.add('counter-container');

    segmentsData.map((segment, idx) => {
      const createdSegment = document.createElement('div');
      createdSegment.classList.add('counter-container-segment');

      createdSegment.innerHTML = `<div class="counter-segment-label">${segment.label}</div>` +
        `<div class="counter-segment">` +
        `<div class="flip-card" data-${uniqueKey}-${segment.type}-tens>` +
        `<div class="top">0</div>` +
        `<div class="bottom">0</div>` +
        `</div>` +
        `<div class="flip-card" data-${uniqueKey}-${segment.type}-ones>` +
        `<div class="top">0</div>` +
        `<div class="bottom">0</div>` +
        `</div>` +
        `</div>`;

      const separatorNode = document.createElement('div');
      separatorNode.classList.add(`${segment.type}`, 'separator');
      separatorNode.textContent = ':';

      if (idx > 0) {
        container.appendChild(separatorNode);
      }

      return container.appendChild(createdSegment);
    })

    return rootNode.appendChild(container);
  }
}