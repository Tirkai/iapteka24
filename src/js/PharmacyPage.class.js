class PharmacyPage{
    static map = null;
    static pharmacy = null;
    static init(){
        PharmacyInfo.ready(() => {
            let splitPath = location.pathname.split('/');
            this.pharmacy = PharmacyInfo.getPharmacy(splitPath[splitPath.length - 1].split("-")[0], "id");
            this.generateMap();
        });
        
    }
    static generateMap(){
        PharmacyInfo.ready(() => {
            YandexMapApi.ready().then(() => {
                this.map = YandexMapApi.createMap("pharmacy-page-map");
                this.map.addPoint({
                    coords: this.pharmacy.coords,
                    icon: this.pharmacy.shortName,
                    hint: this.pharmacy.title
                });

                this.map.mapInstance.setBounds(this.map.mapInstance.geoObjects.getBounds(),{
                    checkZoomRange: true
                }).then(() => {
                    this.map.mapInstance.setZoom(14, { duration: 1000 });
                })
                
                //this.map.mapInstance.setZoom(10, {duration: 1000});
                //PharmacyPage.map.mapInstance.setBounds(PharmacyPage.map.mapInstance.geoObjects.getBounds())
            });
            
        });
    }
}
export { PharmacyPage }