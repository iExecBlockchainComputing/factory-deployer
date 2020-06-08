var FACTORY = require("./factory.json")

module.exports = async function(callback)
{
	try
	{
		console.log("# web3 version:", web3.version);
		chainid   = await web3.eth.net.getId();
		chaintype = await web3.eth.net.getNetworkType();
		console.log("Chainid is:", chainid);
		console.log("Chaintype is:", chaintype);

		console.log(`Checking factory availability`)
		if (await web3.eth.getCode(FACTORY.address) !== "0x")
		{
			console.log(`→ Factory is available on this network`)
		}
		else
		{
			try
			{
				console.log(`→ Factory is not yet deployed on ${chaintype} (${chainid})`)
				await web3.eth.sendSignedTransaction(FACTORY.tx);
				console.log(`→ Factory deployed at address: ${FACTORY.address}`)
			}
			catch (e)
			{
				console.log(`→ Error deploying the factory`)
			}
		}
	
	}
	catch (e)
	{
		callback(e)
	}
	finally
	{
		callback()
	}
};
