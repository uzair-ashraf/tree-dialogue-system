export default class Node {
  private domElement: HTMLElement
  public nodeId: number
  private children: {
    [key: string]: Node
  }
  private answers: string[]
  private _question: HTMLElement
  private _position: {
    x: number
    y: number
  }
  constructor(nodeId: number) {
    this.domElement = null
    this.nodeId = nodeId
    this.children = {}
    this.answers = [
      'Answer 1',
      'Answer 2',
      'Answer 3',
      'Answer 4'
    ]
    this._question = null
    this._position = null
  }
  public get position(): number[] {
    const { x, y } = this._position
    return [x, y]
  }
  public set position([x, y]: number[]) {
    const newPosition = {
      x,
      y
    }
    this.domElement.style.left = `${x}px`
    this.domElement.style.top = `${y}px`
    this._position = newPosition
  }
  public get dimensions(): number[] {
    return [
      this.domElement.offsetWidth,
      this.domElement.offsetHeight
    ]
  }
  private createElement(): HTMLElement {
    const nodeElement = document.createElement('div')
    nodeElement.className = 'node'
    nodeElement.dataset.identifier = 'node'
    nodeElement.dataset.nodeId = this.nodeId.toString()
    this._question = document.createElement('p')
    this._question.className = 'question'
    this._question.dataset.identifier = 'question'
    this._question.textContent = 'What is your Question?'
    const answers = this.answers.map((answer, index) => {
      const a = document.createElement('p')
      a.textContent = answer
      a.dataset.identifier = 'answer'
      a.dataset.answerId = index
      a.draggable = true
      a.className = 'answer'
      return a
    })
    nodeElement.append(
      this._question,
      ...answers
    )
    return nodeElement
  }
  private initChildren(): void {
    this.answers.forEach(( _, i ) => this.children[i] = null)
  }
  public find(nodeId: number): Node {
    console.log('calling find')
    if(nodeId === this.nodeId) return this
    for(const key in this.children) {
      const node = this.children[key].find(nodeId)
      if(node) return node
    }
    return null
  }
  public append(answerId: string, node: Node): void {
    this.children[answerId] = node
  }
  public init(): HTMLElement {
    this.domElement = this.createElement()
    this.initChildren()
    this.position = [100, 100]
    return this.domElement
  }
}
