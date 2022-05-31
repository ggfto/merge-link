let teste = false;
$(document).ready(function() {
	$('#p2').click();
});

function gerarLinks() {
    let arg1 = $('#os').val();
    let arg2 = $('#versoes').val();
    generateLink(arg1.replace(" ", "").trim(), arg2);
}

function generateLink(os, versoes) {
    let arrVersoes = versoes.split(',');
	if(os == "" || os == undefined) {
		showError("Número de OS não preenchida!");
		return;
	}
	if(versoes == "" || versoes == undefined) {
		showError("Versões não informadas!");
		return;
	}
	if(arrVersoes.length == 0 ) {
		showError("Versões com formato incompatível!");
		return;
	}
	for(let i=0;i<arrVersoes.length;i++) {
		let link = "";
		let branch = arrVersoes[i].replace("-RC","").replace("-DEV","").replace("-HOMOLOG", "").replace(" ", "").trim();
		if(isChecked('gtm')) {
			link = linkGen(os, branch, "-DEV", "-DEV");
			openWindow(teste, link);
			continue;
		}

		if(isChecked('dev')) {
			link = linkGen(os, branch, "-DEV");
			openWindow(teste, link);
		}
		
		if(isChecked('rc')) {
			link = linkGen(os, branch, "-RC");
			openWindow(teste, link);
		}

		if(isChecked('homolog')) {
			link = linkGen(os, branch, "-HOMOLOG");
			openWindow(teste, link);
		}

		if(isChecked('fechada')) {
			link = linkGen(os, branch, "");
			openWindow(teste, link);
		}
	}
}

function isChecked(id) {
	let result = false;
	result = $(`#${id}`).is(':checked');
	return result;
}

function openWindow(teste, link, target) {
	if(teste) {
		console.log(link);
	} else {
		window.open(link, (target != undefined && target != "" ? target : '_blank'));
	}
}

function showError(msg) {
	Swal.fire({
		title: "Erro",
		icon: 'error',
		text: msg,
		showDenyButton: false,
		showCancelButton: false,
		confirmButtonText: "OK"
	});
}

function linkGen(os, version, branch, modifier) {
	return `https://git.sankhya.com.br/plataforma-w/sankhyaw/-/merge_requests/new?merge_request%5Bsource_branch%5D=${os}-${version}${modifier != undefined ? modifier : ""}
	&merge_request%5Bsource_project_id%5D=838&merge_request%5Btarget_branch%5D=${version}${branch}
	&merge_request%5Btarget_project_id%5D=838`
}

function versionChange() {
	let selName = "selGitVersion";
	let versoes = $('#versoes').val();
	$(`#${selName}`).html("");
	let arrVersoes = versoes.split(',');
	addOption(selName, "Selecione", undefined);
	for(let i=0;i<arrVersoes.length;i++) {
		if(arrVersoes[i] == undefined || arrVersoes[i] == "") return;
		arrVersoes[i] = arrVersoes[i].replace("-RC","").replace("-DEV","").replace("-HOMOLOG", "").replace(" ", "").trim();
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

function setPriority(priority) {
	$('#dev').prop('checked', true);
	$('#rc').prop('checked', false);
	$('#homolog').prop('checked', false);
	$('#fechada').prop('checked', false);
	if('p1' === priority) {
		$('#dev').prop('checked', true);
		$('#rc').prop('checked', true);
		$('#homolog').prop('checked', false);
		$('#fechada').prop('checked', true);
	}
	versionChange();
}

function selChange() {
	let version = $('#selGitVersion').find(":selected").text();
	$('#git').attr('disabled', true);
	if(version != undefined && version != "Selecione") $('#git').removeAttr('disabled');
}

function abrirGit() {
	let os = $('#os').val();
    os = os.replace(" ", "").trim()
	let selName = "selGitVersion";
    let version = $(`#${selName}`).find(":selected").text();
	if(version != undefined && version != "Selecione") {
		version = version.trim();
		if(version == 'master') version = 'trunk';
		window.open(`https://git.sankhya.com.br/plataforma-w/sankhyaw/-/tree/${os}-${version.toUpperCase()}`, '_blank');
	}
}

function openMergeView() {
    let os = $('#os').val();
    os = os.replace(" ", "").trim();
    windows.open(`https://git.sankhya.com.br/dashboard/merge_requests?scope=all&utf8=✓&state=opened&search=${os}`);
}

function abrirBranch() {
	window.open(`https://git.sankhya.com.br/plataforma-w/branch-estavel/pipelines/new`, '_blank');	
}