$(document).ready(function() {
	document.onkeypress = function(data){
		if (data.which == 13) gerarLinks();
	};
});

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

function generateLink(os, versoes, gtm) {
    let arrVersoes = versoes.split(',');
	for(let i=0;i<arrVersoes.length;i++) {
		let originBranch = ((arrVersoes[i] == 'master') ? 'trunk' : arrVersoes[i]).replace("-RC","").replace("-DEV","").replace("-HOMOLOG", "").replace(" ", "");
		let destinationBranch = arrVersoes[i].toUpperCase();
		if(gtm) originBranch += "-DEV";
		if(gtm) destinationBranch += "-DEV";

		window.open(`https://git.sankhya.com.br/plataforma-w/sankhyaw/-/merge_requests/new?merge_request%5Bsource_branch%5D=${os}-${originBranch}
			&merge_request%5Bsource_project_id%5D=838&merge_request%5Btarget_branch%5D=${destinationBranch}
			&merge_request%5Btarget_project_id%5D=838`, '_blank');
	}
}

function abrirGit() {
	let os = $('#os').val();
	if(os == undefined || os == null || os === "") os = $('#os-gtm').val();
    let version = $('#version').val();
    if(version != undefined) version = version.trim();
    if(version == 'master') version = 'trunk';
	window.open(`https://git.sankhya.com.br/plataforma-w/sankhyaw/-/tree/${os}-${version.toUpperCase()}`, '_blank');
}

function abrirBranch() {
	window.open(`https://git.sankhya.com.br/plataforma-w/branch-estavel/pipelines/new`, '_blank');	
}