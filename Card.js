window.Card = function (obj) {

	this.description = obj.description;
	this.nextLinkForYes = obj.nextLinkForYes;
	this.nextLinkForNo = obj.nextLinkForNo;
	this.cashChange = (obj.cashChange) ? obj.cashChange : 0;
	this.incomeChange = (obj.incomeChange) ? obj.incomeChange : 0;
	this.envHealthChange = (obj.envHealthChange) ? obj.envHealthChange : 0;

	this.toHarloweString = function () {
		return `
Cash: $cash billions
Cash Flow: $income billions
Environmental Health: $envHealth%

${this.description}
(link-goto:"Yes", "${this.nextLinkForYes}[(set: $cash to $cash + ${this.cashChange})(set: $income to $income + ${this.incomeChange})(set: $envHealth to $envHealth + ${this.envHealthChange})]")
(link-goto:"No", "${this.nextLinkForNo}")
`;
	};
}
