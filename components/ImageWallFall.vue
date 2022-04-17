<template>
  <div :style="{position: 'relative', width: wallWidth+'px', height: position.maxHeight+'px'}">
    <!-- 展示墙 -->
    <slot :posData="position.list"></slot>
  </div>
</template>

<script>
/**
 * 一元二次方程解析
 * @param  {number} a 参数
 * @param  {number} b 参数
 * @param  {number} c 参数
 * @return {number} 结果
 */
function equation(a, b, c) {
  return Math.sqrt((Math.pow(b, 2) - 4 * a * c) / (4 * Math.pow(a, 2))) - (b / (2 * a));
}

export default {
  name: 'ImageWallFall',
  props: {
    // 显示区域宽度
    displayWidth: {
      type: Number,
      default: 0
    },
    // 图片显示最大宽度
    imageMinWidth: {
      type: Number,
      default: 190,
      validator: value => {
        return value > 0;
      }
    },
    // 图片显示最小宽度
    imageMaxWidth: {
      type: Number,
      default: 285,
      validator: value => {
        return value > 0 && value < Infinity;
      }
    },
    // 图片间隔比例
    imageGap: {
      type: Number,
      default: 8,
      validator: value => {
        return value >= 0 && value < 100;
      }
    },
    // 最小列数
    minColumns: {
      type: Number,
      default: 3,
      validator: value => {
        return value > 0;
      }
    },
    // 最大列数
    maxColumns: {
      type: Number,
      default: Infinity,
      validator: value => {
        return value > 0 && value <= Infinity;
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
      default: []
    },

    // 是否嵌入banner
    hasBanner: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    // 最小宽度
    minWidth() {
      const minW = this.imageMinWidth;
      const minC = this.minColumns;
      const gap = this.imageGap / 100;

      return minC * minW / (1 - gap) - gap * minW / (1 - gap);
    },
    // 显示列数
    columns() {
      const minColumns = this.minColumns;
      const minW = this.imageMinWidth;

      if (minW > 0) {
        const maxW = Math.max(this.imageMaxWidth, minW / minColumns * (minColumns + 1));
        const w = this.displayWidth;

        let gap = this.imageGap / 100;

        return Math.max(minColumns, Math.ceil(equation(maxW, gap * w - gap * maxW - w, 0)));
      }

      return minColumns;
    },
    // 实际计算宽度
    calWidth() {
      const columns = this.columns;
      const gap = this.imageGap / 100;
      const w = this.displayWidth;
      const minW = this.imageMinWidth;
      const minC = this.minColumns;

      return Math.max(columns * w / (columns - gap), minC * minW / (1 - gap));
    },
    // 显示图片宽度
    sImageWidth() {
      const w = this.calWidth;
      const columns = this.columns;
      const gap = this.imageGap / 100;

      return w / columns * (1 - gap);
    },
    // 显示图片的间距
    sImageGapWidth() {
      const w = this.calWidth;
      const columns = this.columns;
      const gap = this.imageGap / 100;

      return w / columns * gap;
    },

    // 图片墙宽度
    wallWidth() {
      const mWdith = this.minWidth;
      const cWidth = this.calWidth;
      const imgGap = this.sImageGapWidth;

      let dWidth = cWidth - imgGap;

      return Math.max(dWidth, mWdith);
    },
    // 图片展示位置参数
    position() {
      const columns = this.columns;
      const imgW = this.sImageWidth;
      const imgGap = this.sImageGapWidth;
      const imgArr = this.imageRectData;
      const vTop = this.visibleTop;
      const hasBanner = this.hasBanner;

      let colHeights = [0];
      let positionArr = [];

      if (imgArr.length > 0) {
        if (hasBanner) {
          for (let i = 0, l = imgArr.length; i < l; i++) {
            let {width = 0, height = 0} = imgArr[i];

            if (i === 0) {
              // 显示高度
              let imageDisplayHeight = height / width * (imgW * 2 + imgGap);

              // 填充
              positionArr.push({
                top: 0,
                left: i * (imgW + imgGap),
                width: imgW * 2 + imgGap,
                height: imageDisplayHeight,
                visible: 0 <= vTop
              });

              // 更新对应列的高度
              colHeights[0] = imageDisplayHeight;
              colHeights[1] = imageDisplayHeight;
            } else {
              // 显示高度
              let imageDisplayHeight = height / width * imgW;

              if ((i + 1) - columns < 0) {
                // 首行，直接填充
                positionArr.push({
                  top: 0,
                  left: (i + 1) * (imgW + imgGap),
                  width: imgW,
                  height: imageDisplayHeight,
                  visible: 0 <= vTop
                });

                // 更新对应列的高度
                colHeights[(i + 1)] = imageDisplayHeight;
              } else {
                // 找出最小高度的列
                let minHeight = Math.min(...colHeights);
                let colIndex = colHeights.indexOf(minHeight);

                // 计算下一张最小高度的列Top
                let curTop = minHeight + imgGap;

                // 填充占位
                positionArr.push({
                  top: curTop,
                  left: colIndex * (imgW + imgGap),
                  width: imgW,
                  height: imageDisplayHeight,
                  visible: curTop <= vTop
                });

                // 更新对应列的高度
                colHeights[colIndex] = curTop + imageDisplayHeight;
              }
            }
          }
        } else {
          for (let i = 0, l = imgArr.length; i < l; i++) {
            let {width = 0, height = 0} = imgArr[i];

            // 显示高度
            let imageDisplayHeight = height / width * imgW;

            if (i - columns < 0) {
              // 首行，直接填充
              positionArr.push({
                top: 0,
                left: i * (imgW + imgGap),
                width: imgW,
                height: imageDisplayHeight,
                visible: 0 <= vTop
              });

              // 更新对应列的高度
              colHeights[i] = imageDisplayHeight;
            } else {
              // 找出最小高度的列
              let minHeight = Math.min(...colHeights);
              let colIndex = colHeights.indexOf(minHeight);

              // 计算下一张最小高度的列Top
              let curTop = minHeight + imgGap;

              // 填充占位
              positionArr.push({
                top: curTop,
                left: colIndex * (imgW + imgGap),
                width: imgW,
                height: imageDisplayHeight,
                visible: curTop <= vTop
              });

              // 更新对应列的高度
              colHeights[colIndex] = curTop + imageDisplayHeight;
            }
          }
        }
      }

      let res = {};

      res.list = positionArr;
      res.maxTop = Math.min(...colHeights);
      res.maxHeight = Math.max(...colHeights);

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
