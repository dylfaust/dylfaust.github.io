function goAnimState(element, stateId)
{
  if (element.animState)
  {
    element.classList.remove(element.animState);
  }
  element.animState = stateId;
  element.classList.add(element.animState);
}