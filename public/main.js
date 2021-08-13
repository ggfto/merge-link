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

function generateLink(os, versoes) {
    let arrVersoes = versoes.split(',');
	for(let i=0;i<arrVersoes.length;i++) {
		window.open(`https://git.sankhya.com.br/plataforma-w/sankhyaw/-/merge_requests/new?merge_request%5Bsource_branch%5D=${os}-${((arrVersoes[i] == 'master') ? 'trunk' : arrVersoes[i])}
			&merge_request%5Bsource_project_id%5D=838&merge_request%5Btarget_branch%5D=${arrVersoes[i]}
			&merge_request%5Btarget_project_id%5D=838`, '_blank');
	}
}

function abrirGit() {
	let os = $('#os').val();
    let version = $('#version').val();
	window.open(`https://git.sankhya.com.br/plataforma-w/sankhyaw/-/tree/${os}-${version}`, '_blank');
}