function gerarLinks() {
    let arg1 = $('#os').val();
    let arg2 = $('#versoes').val();
    generateLink(arg1, arg2);
}

function gerarLinksGTM() {
    let arg1 = $('#os-gtm').val();
    let arg2 = $('#versoes-gtm').val();
    generateLink(arg1, arg2, true);
}

function generateLink(os, versoes) {
    let arrVersoes = versoes.split(',');
	for(let i=0;i<arrVersoes.length;i++) {
		let originBranch = arrVersoes[i].replace("-RC","").replace("-DEV","").replace("-HOMOLOG", "").replace(" ", "");
		let destinationBranch = arrVersoes[i].toUpperCase().replace("-RC","").replace("-DEV","").replace("-HOMOLOG", "").replace(" ", "");
		if($('#gtm').is(":checked")) originBranch += "-DEV";
		if($('#gtm').is(":checked")) destinationBranch += "-DEV";

		window.open(`https://git.sankhya.com.br/plataforma-w/sankhyaw/-/merge_requests/new?merge_request%5Bsource_branch%5D=${os}-${originBranch}
			&merge_request%5Bsource_project_id%5D=838&merge_request%5Btarget_branch%5D=${destinationBranch}
			&merge_request%5Btarget_project_id%5D=838`, '_blank');
	}
}

function versionChange() {
	let selName = "selGitVersion";
	let versoes = $('#versoes').val();
	$(`#${selName}`).html("");
	let arrVersoes = versoes.split(',');
	addOption(selName, "Selecione", undefined);
	for(let i=0;i<arrVersoes.length;i++) {
		addOption(selName, arrVersoes[i], arrVersoes[i]);
		if($('#dev').is(":checked")) addOption(selName, arrVersoes[i] + "-DEV", arrVersoes[i] + "-DEV");
		if($('#rc').is(":checked")) addOption(selName, arrVersoes[i] + "-RC", arrVersoes[i] + "-RC");
		if($('#homolog').is(":checked")) addOption(selName, arrVersoes[i] + "-HOMOLOG", arrVersoes[i] + "-HOMOLOG");
	}
}

function addOption(select, optText, optVal) {
	let o = new Option(optText, optVal);
	$(o).html(optText);
	$(`#${select}`).append(o);
}

function abrirGit() {
	let os = $('#os').val();
	let selName = "selGitVersion";
    let version = $(`#${selName}`).find(":selected").text();
    if(version != undefined) version = version.trim();
    if(version == 'master') version = 'trunk';
	window.open(`https://git.sankhya.com.br/plataforma-w/sankhyaw/-/tree/${os}-${version.toUpperCase()}`, '_blank');
}

function abrirBranch() {
	window.open(`https://git.sankhya.com.br/plataforma-w/branch-estavel/pipelines/new`, '_blank');	
}