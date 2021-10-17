export function matchIsClickInside(
  container: Element,
  elementClicked: EventTarget | null
) {
  return elementClicked instanceof Node && container.contains(elementClicked)
}
