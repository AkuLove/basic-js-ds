const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.tree = null
  }

  root() {
    return this.tree
  }

  add(data) {
    this.tree = addElement(this.tree, data)

    function addElement(node, data) {
      if(!node) {
        return new Node(data)
      }
      if (node.data === data) {
        return node
      }

      if (data < node.data) {
        node.left = addElement(node.left, data)
      } else {
        node.right = addElement(node.right, data)
      }

      return node
    }
  }

  has(data) {
    function hasElement(node, data) {
      if (!node) {
        return false
      }
      if (node.data === data) {
        return true
      }
      return data < node.data
        ? hasElement(node.left, data)
        : hasElement(node.right, data)
    }

    return hasElement(this.tree, data);
  }

  find(data) {
    function hasElement(node, data) {
      if(!node) return null;
      if (node.data === data) return node;
      if (data < node.data) {
        return hasElement(node.left, data)
      } else {
        return hasElement(node.right, data)
      }
    }

    return hasElement(this.tree, data);
  }

  remove(data) {
    function removeElement(node, data) {
      if (!node) return null;

      if (data < node.data) {
        node.left = removeElement(node.left, data)
      } else if (data > node.data) {
        node.right = removeElement(node.right, data)
      } else {
        if (!node.left && !node.right) return null
        if (!node.left) {
          node = node.right;
          return node;
        }
        if (!node.right) {
          node = node.left;
          return node;
        }

        let minR = node.right;
        while(minR.left) {
          minR = minR.left;
        }
        node.data = minR.data;
        node.right = removeElement(node.right, minR.data);
        return node;
      }
      return node;
    }

    this.tree = removeElement(this.tree, data);
  }

  min() {
    let node = this.tree
    if (!this.tree) return
    while (node.left) {
      node = node.left
    }
    return node.data
  }

  max() {
    let node = this.tree
    if ( !this.tree ) return
    while (node.right) {
      node = node.right
    }
    return node.data
  }
}

module.exports = {
  BinarySearchTree
};