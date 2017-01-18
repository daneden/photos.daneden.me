// @flow
const hScrollElementToPosition = (
  // TODO: dte
  // unlike hScrollCenterElement, el here is an Element and
  // not an HTMLElement. Flow raises a type error that needs
  // investigating.
  el: Element,
  target: number,
  scrollDuration: number
) => {
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

const hScrollCenterElementInParent = (
  el: HTMLElement,
  scrollDuration: number = 500
) => {
  let parent: Element = el.parentElement || document.body,
      targetPos = el.offsetLeft - ((parent.clientWidth / 2) - (el.offsetWidth / 2));
  hScrollElementToPosition(parent, targetPos, scrollDuration);
}

export {
  hScrollElementToPosition,
  hScrollCenterElementInParent
}
