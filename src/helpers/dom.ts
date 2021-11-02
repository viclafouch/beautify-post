import { matchIsLastArrayItem } from './array'

export function matchIsClickInside(
  container: Element,
  elementClicked: EventTarget | null
): boolean {
  return elementClicked instanceof Node && container.contains(elementClicked)
}

export function matchHaveSameParentElement(...nodes: Node[]): boolean {
  return nodes.every((node, index) => {
    if (matchIsLastArrayItem(node, nodes)) {
      return true
    }
    const nextParentElement = nodes[index + 1].parentElement
    return node.parentElement === nextParentElement
  })
}

export function getSiblingsBetweenElements(
  childrenA: Node,
  childrenB: Node
): Node[] {
  if (childrenA === childrenB) {
    return []
  }
  if (!matchHaveSameParentElement(childrenA, childrenB)) {
    return []
  }
  const result = []
  let currentElement: Node | null = childrenA
  while (
    currentElement?.nextSibling &&
    currentElement.nextSibling !== childrenB
  ) {
    result.push(currentElement.nextSibling)
    currentElement = currentElement.nextSibling
  }
  return result
}
