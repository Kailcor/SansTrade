export default class LoadingScene extends Phaser.Scene {

  createLoadingBar(){
      this.progressBar = this.add.graphics();
      this.progressBox = this.add.graphics();
      this.progressBox.fillStyle(0x222222, 0.8);
      this.progressBox.fillRect(160, 270, 320, 50);

      var width = this.cameras.main.width;
      var height = this.cameras.main.height;
      this.loadingText = this.make.text({
          x: width / 2 +5 ,
          y: height / 2 - 70,
          text: 'Loading...',
          style: {
              font: '20px monospace',
              fill: '#ffffff'
          }
      });
      this.percentText = this.make.text({
            x: width / 2 ,
            y: height / 2 +20,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
      });

      this.loadingText.setOrigin(0.5, 0.5);
      this.percentText.setOrigin(0.5, 0.5);
  }

  setListeners(loader){
      var self = this;
      loader.on('progress', function (value) {

          self.progressBar.clear();
          self.progressBar.fillStyle(0xffffff, 1);
          self.progressBar.fillRect(180, 280, 280 * value, 30);
          self.percentText.setText(parseInt(value * 100) + '%');

      });
      loader.on('fileprogress', function (file) {
          console.log(file.src);
      });

      loader.on('complete', function () {
          self.progressBar.destroy();
          self.progressBox.destroy();
          self.loadingText.destroy();
          self.percentText.destroy();
      });

  }

}
