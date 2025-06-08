export const masonryLayout = () => {
  const container = document.querySelector(".mp-portfolio-container");
  if (!container) return;

  const style = getComputedStyle(container);
  const autoRows = parseInt(style.getPropertyValue("grid-auto-rows"), 10) || 20;
  const columnGap = parseInt(style.getPropertyValue("column-gap"), 10);

  document.querySelectorAll(".mp-portfolio-item").forEach((item) => {
    const img = item.querySelector(".mp-portfolio-img img");
    if (!img) return;
  
    const imgHeight = img.getBoundingClientRect().height;
    const rowSpan = Math.ceil((imgHeight + columnGap) / autoRows);
    item.style.gridRowEnd = `span ${rowSpan}`;
  });
};

export default masonryLayout;
