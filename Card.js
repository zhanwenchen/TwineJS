window.BaseCard = function (obj) {

	if (this.constructor === BaseCard) {
      throw new Error("Can't instantiate abstract class!");
  }

	this.description = obj.description;
	this.cashChange = (obj.cashChange) ? obj.cashChange : 0;
	this.incomeChange = (obj.incomeChange) ? obj.incomeChange : 0;
	this.envHealthChange = (obj.envHealthChange) ? obj.envHealthChange : 0;
};

window.SingleLinkCard = function (obj) {
	this._super.call(this, obj);
	this.linkText = obj.linkText;
  this.nextLink = obj.nextLink;

	this.toHarloweString = function () {
		return `
			Cash: $cash billions
			Cash Flow: $income billions
			Environmental Health: $envHealth%

			${this.description}

			[${this.linkText}]<1|
			(click: ?1)[(goto: "${this.nextLink}")]
		`;
	};
};

// SingleLinkCard will inherit from a new object which inherits from the parent
// set the constructor property back to the SingleLinkCard constructor function
// set the "_super" to the BaseCard constructor function
SingleLinkCard.prototype = Object.create(BaseCard.prototype);
SingleLinkCard.prototype.constructor = SingleLinkCard;
SingleLinkCard.prototype._super = BaseCard;

window.YesNoCard = function (obj) {
  // the "new" operator sets the reference of "this" to
  // a new object, the new object is then passed to the
  // Person constructor function through the use of call,
  // so the first name and last name properties can be set
  this._super.call(this, obj);
  this.nextLinkForYes = obj.nextLinkForYes;
	this.nextLinkForNo = obj.nextLinkForNo;

	this.toHarloweString = function () {
		return `
			Cash: $cash billions
			Cash Flow: $income billions
			Environmental Health: $envHealth%

			${this.description}

			[Yes]<1|
			[No]<2|
			(click: ?1)[(set: $cash to $cash + ${this.cashChange} + $income)(set: $income to $income + ${this.incomeChange})(set: $envHealth to $envHealth + ${this.envHealthChange})(set: $history to $history + (a: $passage))(goto: "${this.nextLinkForYes}")]
			(click: ?2)[(set: $cash to $cash + $income)(goto: "${this.nextLinkForNo}")]
		`;
	};
};

// YesNoCard will inherit from a new object which inherits from the parent
// set the constructor property back to the YesNoCard constructor function
// set the "_super" to the BaseCard constructor function
YesNoCard.prototype = Object.create(BaseCard.prototype);
YesNoCard.prototype.constructor = YesNoCard;
YesNoCard.prototype._super = BaseCard;
