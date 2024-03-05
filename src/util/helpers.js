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

export function getSessionInfo(time_labels, partitions, currentSession, recent_tracks) {
  let sesh_start = time_labels[partitions[currentSession][1] -1];
    let sesh_length = time_labels[partitions[currentSession][0]] - sesh_start + recent_tracks[partitions[currentSession][0]].track.duration_ms;
    sesh_length = `${(sesh_length >= 3600000) ? (Math.floor((sesh_length/60000)/60)+'h ') : ''}${Math.round((sesh_length/60000)%60)} min`
    let sesh_day = sesh_start.toDateString().slice(4,11);
    let sesh_time_h = sesh_start.getHours();
    let sesh_time_m = sesh_start.getMinutes();
    if (sesh_time_m === 60) {
      sesh_time_h += 1;
      sesh_time_m = 0;
    }
    sesh_time_m = (sesh_time_m > 9)? sesh_time_m : `0${sesh_time_m}`;
    let sesh_time = `${(sesh_time_h%12 === 0)? '12': (sesh_time_h%12)}:${sesh_time_m} ${((Math.floor(sesh_time_h/12) % 2) ? 'PM' : 'AM')}`;
    return {
      sesh_length,
      sesh_day,
      sesh_time
    }
}
