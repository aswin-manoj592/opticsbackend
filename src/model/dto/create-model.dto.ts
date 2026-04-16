

export class CreateModelDto {
  modelCode: string;
  modelName: string;
  type: string;
  expiry?: boolean;
  nonStockItem?: boolean;
}
