// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

//Extensão do ERC20
contract AMZToken {
    error ERC20InvalidReceiver(address receiver);
    error ERC20InvalidSender(address sender);
    error ERC20InsufficientBalance(address sender, uint256 balance, uint256 needed);
   //Mapping para consultar um endereço e verificar a quantidade de moedas que ele possui
   mapping (address => uint) wallets;
   //Precisa do endereço dono do contrato
   address owner;

   uint256 private _totalSupply;

    string private _name;
    string private _symbol;

    event Transfer(address indexed from, address indexed to, uint256 value);
    //100 * 10 ** ERC20.decimals()
    constructor(string memory name_, string memory symbol_, uint initialValue) {
        _name = name_;
        _symbol = symbol_;
        owner = msg.sender;
        _mint(msg.sender, initialValue);
    }

    function _update(address from, address to, uint256 value) internal virtual {
        if (from == address(0)) {
            // Overflow check required: The rest of the code assumes that totalSupply never overflows
            _totalSupply += value;
        } else {
            uint256 fromBalance = wallets[from];
            if (fromBalance < value) {
                revert ERC20InsufficientBalance(from, fromBalance, value);
            }
            unchecked {
                // Overflow not possible: value <= fromBalance <= totalSupply.
                wallets[from] = fromBalance - value;
            }
        }
        if (to == address(0)) {
            unchecked {
                // Overflow not possible: value <= totalSupply or value <= fromBalance <= totalSupply.
                _totalSupply -= value;
            }
        } else {
            unchecked {
                // Overflow not possible: balance + value is at most totalSupply, which we know fits into a uint256.
                wallets[to] += value;
            }
        }
        emit Transfer(from, to, value);
    }

    function _mint(address account, uint256 value) internal {
        if (account == address(0)) {
            revert ERC20InvalidReceiver(address(0));
        }
        _update(address(0), account, value);
    }

    function _transfer(address from, address to, uint256 value) internal {
        if (from == address(0)) {
            revert ERC20InvalidSender(address(0));
        }
        if (to == address(0)) {
            revert ERC20InvalidReceiver(address(0));
        }
        _update(from, to, value);
    }

    //middleware que verifica se é o owner
    modifier isOwner() {
        require(msg.sender == owner);
        _;
    }

    function transfer(address to, uint256 value) public virtual returns (bool) {
        address from = msg.sender;
        _transfer(from, to, value);
        return true;
    }

   //Função earnAMZ para transferir moedas para o cliente
   function earnAMZ(address to_, uint tokenAmount) public isOwner {
        // Apenas o owner pode transferir moedas para o cliente
        transfer(to_, tokenAmount);
   }

    //Função wasteAMZ para transferir moedas do cliente para o contrato
    function wasteAMZ(uint tokenAmount) public {
        // Apenas o cliente mensageiro pode enviar suas próprias moedas
        // Apenas o contrato pode receber
        transfer(owner, tokenAmount);
    }
    
    //Apenas o usuário pode ver o valor em sua carteira
    function seeBalance() public view returns(uint) {
        return wallets[msg.sender];
    }
}
