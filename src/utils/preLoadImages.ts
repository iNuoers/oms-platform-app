/*
 * @Author: Ben 550461173@qq.com
 * @Date: 2023-12-24 20:47:33
 * @LastEditors: Ben 550461173@qq.com
 * @LastEditTime: 2023-12-26 21:35:57
 * @FilePath: \oms-platform-app\src\utils\preLoadImages.ts
 * @Description:
 */
function preLoadImages(imageArray: string[], callback?: () => void) {
  let loadedImages = 0;
  const imagesToLoad = imageArray.length;

  // 预加载图片
  imageArray.forEach(imageUrl => {
    const img = new Image();
    img.src = imageUrl;

    img.onload = () => {
      // eslint-disable-next-line no-plusplus
      loadedImages++;

      // 检查是否加载完所有图片
      if (loadedImages === imagesToLoad) {
        // 所有图片都已加载完成，执行回调函数
        if (typeof callback === 'function') {
          callback();
        }
      }
    };

    img.onerror = () => {
      // eslint-disable-next-line no-plusplus
      loadedImages++;

      // 如果发生错误，也继续检查是否加载完所有图片
      if (loadedImages === imagesToLoad) {
        // 所有图片都已加载完成，执行回调函数
        if (typeof callback === 'function') {
          callback();
        }
      }
    };
  });
}

export default preLoadImages;

// 使用示例：
// const images: string[] = [
//   'image1.jpg',
//   'image2.jpg',
//   'image3.jpg'
// ];

// preLoadImages(images, () => {
//   console.log('所有图片已加载完成');
//   // 在这里执行你想要进行的操作，比如显示图片等。
// });
