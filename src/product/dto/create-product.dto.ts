export class CreateProductDto {
    code: string;
    barcode?: string;
    productName: string;
    modelCode?: string;
    lensColour?: string;
    madeBy?: string;
    model?: string;
    frameType?: string;
    category?: string;
    power?: string;
    colourCode?: string;
    colour?: string;
    brand?: string;
    taxGroup?: string;
    cost?: number;
    rate?: number;
    hsnCode?: string;
    nonStock?: boolean;
    noOfSticker?: number;
    initialStock?: number;
    image?: string;
}
