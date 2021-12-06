
export class PhotoDisplayType {
  id?: string;
  type?: string;
  description?: string;
}

export class Photo {
  id?: string;
  mimeType?: string;
  source?: string;
  description?: string;
  thumbnail?: string;
  dateCreated?: string;
  size?: number;

  fileId?: string;
  photoDisplayTypeId?: string;
  storeId?: string;
  productId?: string;
  couponId?: string;

  photoDisplayType?: PhotoDisplayType

}
