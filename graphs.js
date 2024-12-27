class Graph {
    constructor(){
        this.adjacencyList = {};
    }
    addVertex(node){
        if(!this.adjacencyList[node])
            this.adjacencyList[node] = [];
    }
    addEdge(v1,v2){
        this.adjacencyList[v1].push(v2); 
        this.adjacencyList[v2].push(v1); 
    }
    removeEdge(vertex1, vertex2){
        this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter(
            v => v !== vertex2
        );
        this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter(
            v => v !== vertex1
        );
    }
    removeVertex(vertex){
        while(this.adjacencyList[vertex].length){
            const adjacentVertex = this.adjacencyList[vertex].pop();
            this.removeEdge(vertex, adjacentVertex);
        }
        delete this.adjacencyList[vertex]
    }
    bfs(vertex){
        // Create 3 variables, queue for BFS, object for tracking visited vertex & finally result array
        let queue = [];
        let result = [];
        let visited = {};

        // Push first vertex and mark it visited
        queue.push(vertex);
        visited[vertex] = true;

        while(queue.length > 0){
            // Get the first element, push it to result
            let currentVertex = queue.shift();
            result.push(currentVertex);
           
            // Iterate through adjacent elements, mark then visited, push to queue
            this.adjacencyList[currentVertex].forEach(neighbor => {
                if(!visited[neighbor]){
                    visited[neighbor] = true;
                    queue.push(neighbor);
                }
            });
        }
        return result;
    }
    dfs(vertex){
        // Create 3 variables, queue for BFS, object for tracking visited vertex & finally result array
        let stack = [];
        let result = [];
        let visited = {};

        // Push first vertex and mark it visited
        stack.push(vertex);
        visited[vertex] = true;

        while(stack.length > 0){
            // Pop the last element, push it to result
            let currentVertex = stack.pop();
            result.push(currentVertex);
           
            // Iterate through adjacent elements, mark them visited, push to stack
            this.adjacencyList[currentVertex].forEach(neighbor => {
                if(!visited[neighbor]){
                    visited[neighbor] = true;
                    stack.push(neighbor);
                }
            });
        }
        return result;
    }

    dfsRec(vertex){
        // Create 2 variables, object for tracking visited vertex & finally result array
        let result = [];
        let visited = {};

        // Mark the vertex as visited
        visited[vertex] = true;

        // Define the recursive function
        const dfs_rec = (currentVertex) => {
            // Push the current vertex to the result
            result.push(currentVertex);

            // Iterate through adjacent vertices
            this.adjacencyList[currentVertex].forEach(neighbor => {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    dfs_rec(neighbor); // Recursive call
                }
            });
        };

        // Start the DFS traversal from the initial vertex
        dfs_rec(vertex);

        return result;
    }
}

//          A
//        /   \
//       B     C
//       |     |
//       D --- E
//        \   /
//          F


let graph = new Graph();
graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");
graph.addVertex("D");
graph.addVertex("E");
graph.addVertex("F");

graph.addEdge("A", "B");
graph.addEdge("A", "C");
graph.addEdge("B", "D");
graph.addEdge("C", "E");
graph.addEdge("D", "E");
graph.addEdge("D", "F");
graph.addEdge("E", "F")

console.log(graph.bfs("A"));
//console.log(graph.dfs("A"));
console.log(graph.dfsRec("A"));



