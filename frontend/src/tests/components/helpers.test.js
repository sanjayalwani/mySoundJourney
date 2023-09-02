import {
  msToTrackLength
} from "../../util/helpers";
import "jest"

describe("Track length calculated correctly from milliseconds", () => {
  test("< 60 second track length correctly renders", () => {
    const ms = 59 * 1000;
    const trackLen = msToTrackLength(ms);

    expect(trackLen).toBe('0:59');
  });

  test("< 60 minutes track length correctly renders", () => {
    const ms = 63 * 1000;
    const trackLen = msToTrackLength(ms);

    expect(trackLen).toBe('1:03');
  });

  test(">= 1 hour track length correctly renders", () => {
    let an_hour_in_ms = 60 * 60 * 1000;
    let ms = an_hour_in_ms + (125 * 1000);

    const trackLen = msToTrackLength(ms);

    expect(trackLen).toBe('1:02:05');
  });
})
