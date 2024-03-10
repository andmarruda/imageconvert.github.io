class converter {
  /**
   * Constructor
   * @param file - image file
   * @return {void}
   * @constructor
  */
  constructor(file) {
    this._file = file;
    this._allowdExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
    this._canvas = document.createElement('canvas');
    this._ctx = this._canvas.getContext('2d');
    this._quality = 100;
    this._originalWidth = null;
    this._originalHeight = null;
    this._newWidth = null;
    this._newHeight = null;
    this._imageUrl = null;
  }

  /**
   * Load image
   * @return void
   */
  async loadImage() {
    const img = new Image();
    this._imageUrl = URL.createObjectURL(this._file);
    img.src = this._imageUrl;
    const imagePromise = await (new Promise((resolve, reject) => {
      img.onload = () => {
        resolve(img);
      };
    }));

    this._originalWidth  = imagePromise.width;
    this._originalHeight = imagePromise.height;
  }

  /**
   * Get image extension
   * @return {string} image extension
   */
  getExtension() {
    return this._file.name.split('.').pop().toLowerCase();
  }

  /**
   * Check if the image is valid
   * @return {boolean} true if the image is valid, false otherwise
   */
  isValid() {
    return this._allowdExtensions.includes(this.getExtension());
  }

  /**
   * Proportion changing width
   * @param {number} width - new width
   * @return {number} new height
   */
  calcNewHeight(width) {
    this._newHeight = (width * this._originalHeight) / this._originalWidth
    this._newWidth = width;
    return Math.round(this._newHeight);
  }

  /**
   * Proportion changing height
   * @param {number} height - new height
   * @return {number} new width
   */
  calcNewWidth(height) {
    this._newWidth = (height * this._originalWidth) / this._originalHeight;
    this._newHeight = height;
    return Math.round(this._newWidth);
  }

  /**
   * Return image data
   * @return {object} image data
   */
  getImageData() {
    return {
      'width': this._originalWidth,
      'height': this._originalHeight,
      'name': this._file.name,
      'size': this._file.size,
      'format': this.getExtension(),
      'url': this._imageUrl
    };
  }

  /**
   * Crop image by coordinates and size
   * @param {number} x - x coordinate
   * @param {number} y - y coordinate
   * @param {number} width - new width
   * @param {number} height - new height
   * @return {void}
   */
  crop(x, y, width, height) {
    this._canvas.width = width;
    this._canvas.height = height;
    this._ctx.drawImage(this._imageUrl, x, y, width, height, 0, 0, width, height);
  }
}