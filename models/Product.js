class Product {
    constructor(
        id,
        slug,
        name,
        only_name,
        brand_name,
        product_type,
        country_made,
        country_brand,
        photo,
        description,
        short_description,
        creation_date,
        video,
        warranty,
        price,
        is_available
    ) {
        this.id = id;
        this.slug = slug;
        this.name = name;
        (this.onlyName = only_name), (this.brandName = brand_name);
        this.productType = product_type;
        this.countryMade = country_made;
        this.countryBrand = country_brand;
        this.photo = photo;
        this.description = description;
        this.shortDescription = short_description;
        this.creationDate = creation_date;
        this.video = video;
        this.warranty = warranty;
        this.price = price;
        this.isAvailable = is_available;
    }
}
export default Product;
