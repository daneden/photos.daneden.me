const scrollElementToPosition = (el, target, scrollDuration) => {
  let cosParameter = (target - el.scrollLeft) / 2,
      scrollCount = 0,
      oldTimestamp = performance.now();

  function step(newTimestamp) {
    // Find the maximum scrollLeft value
    let cappedTarget = Math.floor(Math.max(Math.min(target, el.scrollWidth - el.clientWidth), 0));

    // scrollCount is the progress from 0-Pi
    scrollCount += Math.PI / (scrollDuration / (newTimestamp - oldTimestamp));

    // If we've exceeded 100% progress, set the scroll and exit
    if (scrollCount >= Math.PI) el.scrollLeft = cappedTarget;
    if (el.scrollLeft === cappedTarget) return;

    // Set the value for the next scroll position
    let newVal = Math.round(cosParameter + cosParameter * Math.cos(scrollCount));
    el.scrollLeft = target - newVal;

    // Update the timestamp and iterate
    oldTimestamp = newTimestamp;
    window.requestAnimationFrame(step);
  }

  window.requestAnimationFrame(step);
}

export {
  scrollElementToPosition
}
