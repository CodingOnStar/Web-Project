import { graph, myVertices } from './Graph.mjs';
import Queue from './Queue.mjs';
import Stack from './Stack.mjs';
const Colors = {
    WHITE: 0,
    GREY: 1,
    BLACK: 2
}
const initializeColor = (vertices) => {
    const color = {}
    for (let i = 0; i < vertices.length; i++) {
        color[vertices[i]] = Colors.WHITE
    }
    return color
}
const BFS = (graph, startVertex) => {
    const vertices = graph.getVertices()
    const adjList = graph.getAdjList()
    const color = initializeColor(vertices)
    const queue = new Queue()
    const distances = {}
    const predecessors = {}
    queue.enqueue(startVertex)
    for (let i = 0; i < vertices.length; i++) {
        distances[vertices[i]] = 0
        predecessors[vertices[i]] = null
    }
    while (!queue.isEmpty()) {
        const u = queue.dequeue()
        const neighbors = adjList.get(u)
        color[u] = Colors.GREY
        for (let i = 0; i < neighbors.length; i++) {
            const w = neighbors[i]
            if (color[w] === Colors.WHITE) {
                color[w] = Colors.GREY
                distances[w] = distances[u] + 1
                predecessors[w] = u
                queue.enqueue(w)
            }
        }
        color[u] = Colors.BLACK
    }
    return {
        distances,
        predecessors
    }
}
const shortestPath = BFS(graph, myVertices[0])
console.log(shortestPath)
const fromVertex = myVertices[0]
for (let i = 1; i < myVertices.length; i++) {
    const toVertex = myVertices[i]
    const path = new Stack()
    for (let v = toVertex; v !== fromVertex; v = shortestPath.predecessors[v]) {
        path.push(v)
    }
    path.push(fromVertex)
    let s = path.pop()
    while (!path.isEmpty()) {
        s += ' - ' + path.pop()
    }
    console.log(s)
}