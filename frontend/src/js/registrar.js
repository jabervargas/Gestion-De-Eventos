document.addEventListener("DOMContentLoaded", () => {
	const accountTabs = document.querySelectorAll("[data-account-type]");
	const accountFieldsets = document.querySelectorAll("[data-account-fieldset]");

	function selectAccountType(accountType) {
		accountTabs.forEach((tab) => {
			const isSelected = tab.dataset.accountType === accountType;
			tab.classList.toggle("is-active", isSelected);
			tab.setAttribute("aria-selected", String(isSelected));
		});

		accountFieldsets.forEach((fieldset) => {
			const isSelected = fieldset.dataset.accountFieldset === accountType;
			fieldset.classList.toggle("is-active", isSelected);
			fieldset.hidden = !isSelected;

			fieldset.querySelectorAll("input, select, textarea").forEach((field) => {
				field.disabled = !isSelected;
				field.required = isSelected;
			});
		});
	}

	accountTabs.forEach((tab) => {
		tab.addEventListener("click", () => {
			selectAccountType(tab.dataset.accountType);
		});
	});

	const initialAccountType = document.querySelector("[data-account-type].is-active")?.dataset.accountType
		|| "natural";
	selectAccountType(initialAccountType);
});
