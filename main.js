const SHA256 = require("crypto-js/sha256");

/*---------------------------------------------------------------------
creating a simple class which contain some basic fields
here taking previousHash empty becuase there is first
his constructor having an extra properties hash which will containt the hash link
/-----------------------------------------------------------------------*/
class Block {
  constructor(index, timestamp, data, previousHash = "") {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }
  // creating a method which calculates the hash of this block and will return the hash

  calculateHash() {
    // here we are using SHA256 algorigthm from NPM crypto-js
    return SHA256(
      this.index +
        this.previousHash +
        this.timestamp +
        JSON.stringify(this.data)
    ).toString();
  }
}

/*--------------------------------------------------------------------------
creating new class for Blockchain 
/--------------------------------------------------------------------------*/
class Blockchain {
  //creating constructor which is resposible for initializing our blockchain
  constructor() {
    //creating a property chain that is an array of blocks
    this.chain = [this.createGenisisBlock()];
  } // the first block in Blockchain is called Genisis Block that should be added Manually
  // So here we are creating method createGenisisBlock()

  createGenisisBlock() {
    //this method will return new Block
    //so giving values here
    return new Block(0, "21/10/2019", "Genisis block", "0");
  }

  //adding new method it returns the latest block in chain
  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  //adding more method so this is responsible to adding new chain
  addBlock(newBlock) {
    //Here were are connecting two chains last and upcomming chaing
    newBlock.previousHash = this.getLatestBlock().hash;

    //Here we are recalculing hash
    newBlock.hash = newBlock.calculateHash();

    // Chain pushing into array
    this.chain.push(newBlock);
  }

  //applying Validation is Blockchain is valid or not?
  // we created method but we are not using here just for Demo
  isBlockChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return "This Block is Not Valid!";
      }
      if (previousBlock.hash !== previousBlock.calculateHash()) {
        return "This Block is Valid!";
      }
    }
  }
}

let blockChain = new Blockchain();
blockChain.addBlock(new Block(1, "21/10/2019", { amount: 5 }));
blockChain.addBlock(new Block(2, "21/10/2019", { amount: 10 }));
blockChain.addBlock(new Block(3, "21/10/2019", { amount: 15 }));
blockChain.addBlock(new Block(4, "21/10/2019", { amount: 20 }));
blockChain.addBlock(new Block(5, "21/10/2019", { amount: 25 }));

// output without validation
console.log(JSON.stringify(blockChain, null, 4));

