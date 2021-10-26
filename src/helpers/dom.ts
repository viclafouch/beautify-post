import { matchIsLastArrayItem } from './array'

export function matchIsClickInside(
  container: Element,
  elementClicked: EventTarget | null
) {
  return elementClicked instanceof Node && container.contains(elementClicked)
}

export function matchAreNodeDifferents(nodeA: Node, nodeB: Node) {
  return nodeA !== nodeB
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

export function getAllNodeNamesBetweenChildren(
  childrenA: Node,
  childrenB: Node
): string[] {
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
    result.push(currentElement.nextSibling.nodeName)
    currentElement = currentElement.nextSibling
  }
  return result
}
