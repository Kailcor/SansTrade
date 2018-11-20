export default class SelectionMenu {
  constructor(menuMapping, scene){
      this.scene = scene;
      this.menuMapping = menuMapping;
      this.createSectionsIndex();
      this.currentSectionID = 0;//ID of the current actived section.
      this.numSections = this.menuMapping.SECTION.length -1; // Max ID for a available sections.
      //this.maxNumberOfItems = 0; // the highest number of item of all the sections.

      this.sectionObj = this.menuMapping.SECTION[this.currentSectionID]; //Object of the section which is the user in...
      this.items = [];// Array with all the items of all sections item[maxNumberOfItems*sectionID + itemID] = sprite;
      this.itemSelectedList = []; // which item is selected in each section.
      this.disableItems = [];

      this.itemSelectedList[this.sectionObj.ID] = 0; //settig default item selected.
      this.maxNumberOfItemsCurrentSection = this.sectionObj.ITEMS.length - 1;

      this.createItemStartedPointOnListForSections();

      this.minItemIDForSection = this.menuMapping.SECTION[this.currentSectionID].itemStartedPointOnList;
      this.maxItemIDForSection = this.menuMapping.SECTION[this.currentSectionID].itemStartedPointOnList
                + this.menuMapping.SECTION[this.currentSectionID].ITEMS.length;

      this.createItems();

  }
  getListItemsSelected(){
      return this.itemSelectedList;
  }
  createSectionsIndex(){
    this.menuMapping.SECTION.forEach((section, index)=>{
        section.ID= index;
    });
  }
  createItemStartedPointOnListForSections(){
      let startedPoint = 0;
      var self = this;
      this.menuMapping.SECTION.forEach((section)=>{
          section.itemStartedPointOnList = startedPoint;
          startedPoint+= section.ITEMS.length;
      });
  }
  nextSection(){
    if(this.currentSectionID < this.numSections){
      this.sectionObj = this.menuMapping.SECTION[++this.currentSectionID];
      //If is not selected item, set de first one.
      if(this.itemSelectedList[this.sectionObj.ID] == undefined){
        this.itemSelectedList[this.sectionObj.ID] = 0;
      }
      this.maxNumberOfItemsCurrentSection = this.sectionObj.ITEMS.length - 1;
      this.minItemIDForSection = this.menuMapping.SECTION[this.currentSectionID].itemStartedPointOnList;
      this.maxItemIDForSection = this.menuMapping.SECTION[this.currentSectionID].itemStartedPointOnList
                + this.menuMapping.SECTION[this.currentSectionID].ITEMS.length;
    }
  }
  prevSection(){
    if(this.currentSectionID > 0){
      this.sectionObj = this.menuMapping.SECTION[--this.currentSectionID];
      this.maxNumberOfItemsCurrentSection = this.menuMapping.SECTION[this.currentSectionID].ITEMS.length - 1;
      this.minItemIDForSection = this.menuMapping.SECTION[this.currentSectionID].itemStartedPointOnList;
      this.maxItemIDForSection = this.menuMapping.SECTION[this.currentSectionID].itemStartedPointOnList
                + this.menuMapping.SECTION[this.currentSectionID].ITEMS.length;
    }
  }

  nextItem(){
      if(this.itemSelectedList[this.sectionObj.ID] < this.maxNumberOfItemsCurrentSection){
          this.itemSelectedList[this.sectionObj.ID]++;
      }else{
          this.itemSelectedList[this.sectionObj.ID] = 0;
      }
      
      if(this.disableItems[this.sectionObj.ID] != undefined && this.disableItems[this.sectionObj.ID].length > 0 ){
          this.disableItems[this.sectionObj.ID].forEach((item) => {
              if( this.itemSelectedList[this.sectionObj.ID] === item)  {
                  this.nextItem();
              }
          });
      }
  }
  prevItem(){
    if(this.itemSelectedList[this.sectionObj.ID]>0){
      this.itemSelectedList[this.sectionObj.ID]--;
    }else{
      this.itemSelectedList[this.sectionObj.ID] = this.maxNumberOfItemsCurrentSection;
    }
    if(this.disableItems[this.sectionObj.ID] != undefined && this.disableItems[this.sectionObj.ID].length > 0 ){
      console.log("array of disableItems");
      console.log(this.disableItems[this.sectionObj.ID]);
        this.disableItems[this.sectionObj.ID].forEach((item) => {
            if( this.itemSelectedList[this.sectionObj.ID] === item)  {
                this.prevItem();
            }
        });
    }
  }
  getActiveSection(){
    return this.sectionObj.ID;
  }
  getActiveItem(){
    this.itemSelectedList[this.sectionObj.ID];
  }
  getSelectedItemFromSection(sectionID){
      return this.menuMapping.SECTION[sectionID].ITEMS[this.itemSelectedList[sectionID]];

  }
  setDisableItems(sectionID,array){

      this.disableItems[sectionID] = array;
  }
  update(){
      var self = this;
      this.items.forEach(  (item,index) => {

          if( index >= self.minItemIDForSection &&  index < self.maxItemIDForSection)  {
              item.alpha=0.6;
          }
      });
      var id = (this.minItemIDForSection) + this.itemSelectedList[this.sectionObj.ID];
      //console.log(this.items);
      //console.log(id);
      this.items[id].alpha=1;
  }

  createItems(){
    var self = this;
    self.menuMapping.SECTION.forEach((section) =>{

        section.ITEMS.forEach((item,index)=> {
           item.ID = index;
           var itemIDonList =(section.itemStartedPointOnList) +item.ID;
           self.items[itemIDonList] = self.scene.physics.add.sprite(item.X,item.Y, item.SPRITEKEY);
           self.items[itemIDonList].alpha = 0.5;
           self.items[itemIDonList].setScale(item.SCALE);

           self.items[itemIDonList].anims.play(item.ANIMKEY,false);
        });
    });
  }
}
