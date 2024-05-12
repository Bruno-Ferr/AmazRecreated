export const amzAbi = [
  // Get the account balance
  "function seeBalance() view returns (uint)",

  // Send some of your tokens to someone else
  "function earnAMZ(address to, uint amount) public isOwner ",
  "function wasteAMZ(uint tokenAmount) public",

  // An event triggered whenever anyone transfers to someone else
  "event Transfer(address indexed from, address indexed to, uint value)"
];