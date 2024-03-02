import API from "./API";

var Inventory = {
    async CreateInventoryItem(Item) {
        var result = await API.process(
            'api/InventoryItem',
            'POST',
            Item
        ).catch((err) => {
            throw err;
        })

        return result
    },
    async ListInventory(Item) {
        var result = await API.process(
            'api/InventoryItem',
            'GET',
            null
        ).catch((err) => {
            throw err;
        })

        return result
    },
    /*
    Brands
    */
    async ListBrands() {
        var result = await API.process(
            'api/InventoryItem/Brands',
            'GET',
            null
        ).catch((err) => {
            throw err;
        })

        return result
    },
    async CreateBrand(brand) {
        var result = await API.process(
            'api/InventoryItem/Brand',
            'POST',
            brand
        ).catch((err) => {
            throw err;
        })

        return result
    },
    /*
    Categories
    */

    async ListInventoryCategories() {
        var result = await API.process(
            'api/InventoryItem/Categories',
            'GET',
            null
        ).catch((err) => {
            throw err;
        })

        return result
    },
    async CreateInventoryCategory(category) {
        var result = await API.process(
            'api/InventoryItem/Category',
            'POST',
            category
        ).catch((err) => {
            throw err;
        })

        return result
    },
}

export default Inventory;