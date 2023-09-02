export function msToTrackLength(ms) {
    const s = ms / 1000;

    const hours = Math.floor(s / 3600);
    const minutes = Math.floor((s % 3600) / 60);
    const seconds = Math.floor(s % 60);
    
    if (hours) {
      return `${hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}`: seconds}`;
    }

    return `${minutes}:${seconds < 10? `0${seconds}`: seconds}`;
}
