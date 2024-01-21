import { FirebaseStorage, getDownloadURL, getStorage, listAll, ref } from "firebase/storage";

export default class GetImgStorage {
  storage: FirebaseStorage;

  constructor() {
    this.storage = getStorage();
  }

  // 나중에 이름만 바꿔서 인자로 ref 넣어주고 다른 곳에서 재사용
  async getImages(url: string) {
    const detailRef = ref(this.storage, url);

    try {
      const images = await listAll(detailRef);
      const urls = await Promise.all(images.items.map(async (imageRef) => getDownloadURL(imageRef)));
      return urls;
    } catch (error) {
      console.log('storage error ' + error);
    }
  }

  async preloadImgs(url: string[] | undefined) {
    await Promise.all(
      url?.map(
        (url) =>
          new Promise((resolve) => {
            const image = new Image();
            image.src = url;
            image.onload = resolve;
          })
      ) || []
    );
  }
}

