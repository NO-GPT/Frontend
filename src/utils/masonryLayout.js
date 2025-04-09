export const masonryLayout = (container, itemClass, imgClass) => {
  if (!container) return;

  const style = getComputedStyle(container);
  const autoRows = parseInt(style.getPropertyValue("grid-auto-rows"), 10) || 20;
  const columnGap = parseInt(style.getPropertyValue("column-gap"), 10);

  const items = container.querySelectorAll(`.${itemClass}`);
  items.forEach(item => {
    const img = item.querySelector(`.${imgClass}`);
    if (!img) return;

    const imgHeight = img.getBoundingClientRect().height;
    const rowSpan = Math.ceil((imgHeight + columnGap) / autoRows);
    item.style.gridRowEnd = `span ${rowSpan}`;
  });
};

export default masonryLayout;
