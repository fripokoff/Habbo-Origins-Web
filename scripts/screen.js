function insertObjectWithScreenSize() {
				const screenWidth = window.innerWidth;
				const screenHeight = window.innerHeight;
            const objectHTML = `
                <object classid="clsid:166B1BCA-3F9C-11CF-8075-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/director/sw.cab#version=10,8,5,1,0" id="habbo" width="${screenWidth}" height="${screenHeight}">
                    <param name="src" value="dcr/habbo.dcr">
                    <param name="swStretchStyle" value="meet">
                    <param name="bgColor" value="#000000">
                    <param name="sw2" value="connection.info.host=game-ous.habbo.com;connection.info.port=40001">
					<param name="sw3" value="connection.mus.host=game-ous.habbo.com;connection.mus.port=40002">
					<param name="sw4" value="site.url=http://origins.habbo.com;url.prefix=http://origins.habbo.com/">
					<param name="sw5" value="client.reload.url=http://origins.habbo.com/habbo/br;client.fatal.error.url=http://origins.habbo.com/">
					<param name="sw6" value="external.variables.txt=http://origins-gamedata.habbo.com/external_variables/1">
					<param name="sw7" value="external.texts.txt=http://origins-gamedata.habbo.com/external_texts/1">
					<param name="sw8" value="client.allow.cross.domain=1;client.notify.cross.domain=0">
                    <embed id="habboEmbed" src="dcr/habbo.dcr" bgcolor="#000000" width="${screenWidth}" height="${screenHeight}" swvolume="true"
                    swrestart="false" swpauseplay="false" swfastforward="false" swtitle="Habbo Hotel" swcontextmenu="true"
                    swstretchstyle="meet" swtext="" type="application/x-director" pluginspage="http://www.macromedia.com/shockwave/download/"
                    sw2="connection.info.host=game-ous.habbo.com;connection.info.port=40001"
                    sw3="connection.mus.host=game-ous.habbo.com;connection.mus.port=40002"
                    sw4="site.url=http://origins.habbo.com;url.prefix=http://origins.habbo.com/"
                    sw5="client.reload.url=http://origins.habbo.com/habbo/br;client.fatal.error.url=http://origins.habbo.com/"
                    sw6="external.variables.txt=http://origins-gamedata.habbo.com/external_variables/1"
                    sw7="external.texts.txt=http://origins-gamedata.habbo.com/external_texts/1"
                    sw8="client.allow.cross.domain=1;client.notify.cross.domain=0"></embed>
                </object>
            `;
            document.getElementById('container').innerHTML = objectHTML;
        }
		function updateEmbedSize() {
			const screenWidth = window.innerWidth;
			const screenHeight = window.innerHeight;
			console.log(screenHeight);
			const embed = document.getElementById('habboEmbed');
			if (embed) {
				embed.width = screenWidth;
				embed.height = screenHeight;
			}
		}
			window.addEventListener('resize', function() {
				updateEmbedSize();
	});
        window.addEventListener('load', insertObjectWithScreenSize);