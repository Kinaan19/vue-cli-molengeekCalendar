// reserver de lundi 16h à mardi 2h (par exemple)
function selectShifts() {
  for (let i = state.index1; i != state.index2; i++) {
    state.shifts[i].selected = true;
    if(i == state.shifts.length-1) {
      i = -1;
    }
  }
}
function confirmReserv() {
  if(state.index1 < state.index2) {
    for (let i = state.index1; i <= state.index2; i++) {
      state.shifts[i].hide = true;
    }
  }else {
    for (let i = state.index1; i != state.index2+1; i++) {
      state.shifts[i].hide = true;
      if(i == state.shifts.length-1) {
        i = -1;
      }
    }
  }
}