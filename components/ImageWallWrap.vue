<template>
  <div :style="{position: 'relative', width: displayWidth+'px', height: position.maxHeight+'px'}">
    <!-- 展示墙 -->
    <slot :posData="position.list"></slot>
  </div>
</template>

<script>
function calcFitArr(widthArr, wholeWidth, minWidth, maxWidth) {
  // 缓存
  const tArr = widthArr.concat([]);
  // 宽度总和
  const sumWidth = widthArr.reduce((partialSum, a) => partialSum + a, 0);
  // 模式
  const isUp = wholeWidth > sumWidth;
  // 变化值
  let delta = Math.abs(wholeWidth - sumWidth);
  // 数组数量
  const len = tArr.length;

  // 改变值计数
  let changedDelta = 0;

  while (delta > 0) {
    // 达到限制的个数
    let limitCount = 0;

    for (let i = 0; i < len; i++) {
      // 增模式
      if (isUp) {
        // 当前值没有超过上限
        if (tArr[i] < maxWidth) {
          tArr[i]++;
          delta--;

          changedDelta++;
        }
        // 当前值超过上限
        else {
          limitCount++;
        }
      }
      // 减模式
      else {
        // 当前值没有低于下限
        if (tArr[i] > minWidth) {
          tArr[i]--;
          delta--;

          changedDelta++;
        }
        // 当前值超过上限
        else {
          limitCount++;
        }
      }

      if (delta === 0) {
        break;
      }
    }

    if (limitCount === len) {
      break;
    }
  }

  if (delta === 0) {
    tArr.changedDelta = changedDelta;
    return tArr;
  }
  else {
    return [];
  }
}

export default {
  name: 'ImageWallWrap',
  props: {
    // 显示区域宽度
    displayWidth: {
      type: Number,
      default: 0
    },

    // 图片显示最小宽高比
    imageMinAspectRatio: {
      type: Number,
      default: .75,
      validator: value => {
        return value > 0 && value < Infinity;
      }
    },
    // 图片显示最大宽高比
    imageMaxAspectRatio: {
      type: Number,
      default: 2.28,
      validator: value => {
        return value > 0 && value < Infinity;
      }
    },
    // 图片显示高度
    imageHeight: {
      type: Number,
      default: 240,
      validator: value => {
        return value > 0 && value < Infinity;
      }
    },
    // 图片间隔
    imageGap: {
      type: Number,
      default: 16,
      validator: value => {
        return value >= 0
      }
    },

    // 可视高度
    visibleTop: {
      type: Number,
      default: 0,
      validator: value => {
        return value >= 0;
      }
    },

    // 图片高宽 数据
    imageRectData: {
      type: Array,
      default: () => {
        return [];
      }
    },
  },
  computed: {
    // 图片展示位置参数
    position() {
      const dWidth = this.displayWidth;
      const imgGap = this.imageGap;
      const imgH = this.imageHeight;
      const imgArr = this.imageRectData;
      const vTop = this.visibleTop;
      const minRatio = this.imageMinAspectRatio;
      const maxRatio = this.imageMaxAspectRatio;

      // 位置
      let res = {};

      // 最小宽度
      const minWidth = Math.ceil(minRatio * imgH);
      // 最大宽度
      const maxWidth = Math.floor(maxRatio * imgH);

      // 缓存
      let cache = {};
      // 当前行索引
      let rowIndex = 0;
      // 当前行剩余宽度
      let rowLeftWidth = dWidth;

      if (imgArr.length > 0) {
        for (let i = 0, l = imgArr.length; i < l; i++) {
          if (!cache[rowIndex]) {
            cache[rowIndex] = [];
          }

          let tmpArr = cache[rowIndex];

          let {width = 0, height = 0} = imgArr[i];

          // 图片高宽比
          let imageAspectRatio = Math.min(Math.max(width / height, minRatio), maxRatio);
          // 实际占位宽度
          let placeholderWidth = imageAspectRatio * imgH;
          if (imageAspectRatio > (minRatio + maxRatio) / 2) {
            placeholderWidth = Math.floor(placeholderWidth);
          }
          else {
            placeholderWidth = Math.ceil(placeholderWidth);
          }
          // 剩余空间
          let tSpace = rowLeftWidth - placeholderWidth;

          // console.log(imageAspectRatio, placeholderWidth);

          const top = rowIndex * (imgH + imgGap);

          // 剩余空间够
          if (tSpace > 0) {
            const preItem = tmpArr[tmpArr.length - 1];

            const left = preItem ? (preItem.left + preItem.width + imgGap) : 0;

            const curItem = {
              top: top,
              left: left,
              width: placeholderWidth,
              height: imgH,
              visible: top <= vTop,
            };

            tmpArr.push(curItem);

            rowLeftWidth = dWidth - curItem.left - curItem.width - imgGap;
          }
          // 剩余空间不够
          else if (tSpace < 0) {
            // 已有宽度 集合
            const wArr = tmpArr.map(i => i.width);
            // 已有宽度 + 当前宽度 集合
            let cArr = wArr.concat(placeholderWidth);

            // 计算结果
            let nArr1 = calcFitArr(cArr, dWidth - imgGap * wArr.length, minWidth, maxWidth);
            let nArr2 = calcFitArr(wArr, dWidth - imgGap * (wArr.length - 1), minWidth, maxWidth);

            // 有结果，取最小改动
            if (nArr1.length !== 0 || nArr2.length !== 0) {
              let dstArr = nArr1;

              if (nArr1.length === 0 || nArr1.changedDelta > nArr2.changedDelta) {
                dstArr = nArr2;
                i--;
              }

              for (let p = 0, q = dstArr.length; p < q; p++) {
                const preItem = tmpArr[p - 1];
                const left = preItem ? (preItem.left + preItem.width + imgGap) : 0;

                tmpArr[p] = {
                  top: top,
                  left: left,
                  width: dstArr[p],
                  height: imgH,
                  visible: top <= vTop,
                };
              }

              rowLeftWidth = dWidth;
              rowIndex++;
            }
            // 没有结果，直接换行
            else {
              rowLeftWidth = dWidth;
              rowIndex++;

              i--;
            }
          }
          // 正好用完剩余空间
          else {
            const preItem = tmpArr[tmpArr.length - 1];

            const left = preItem ? (preItem.left + preItem.width + imgGap) : 0;

            const curItem = {
              top: top,
              left: left,
              width: placeholderWidth,
              height: imgH,
              visible: top <= vTop,
            };

            tmpArr.push(curItem);
            rowLeftWidth = dWidth;
            rowIndex++;
          }
        }
      }

      // 移除末尾空行
      if (!cache[rowIndex]) {
        rowIndex--;
      }

      res.list = [];
      for (var i = 0; i <= rowIndex; i++) {
        res.list = res.list.concat(cache[i]);
      }

      res.maxTop = rowIndex * (imgH + imgGap);
      res.maxHeight = res.maxTop + imgH;

      return res;
    }
  },
  watch: {
    visibleTop(val) {
      if (val > this.position.maxTop - 100) {
        this.$emit('reachBottom')
      }
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
