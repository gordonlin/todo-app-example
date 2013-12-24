define([], function() {
    if (!String.prototype.format) {
        //http://github.com/prettycode/String.prototype.format.js
        String.prototype.format = function() {
            var args = Array.prototype.slice.call(arguments);
            if (args.length === 1 && typeof args[0] === "object") {
                args = args[0];
            }
            var result = this,
                match;
            for (var i = 0;
                (match = /{(\d+|\w+)?}/gm.exec(result)); i++) {
                var key = match[1];
                if (!key) {
                    result = result.replace("{}", args[i]);
                } else {
                    result = result.replace(new RegExp("\\{" + key + "\\}", "gm"), args[key]);
                }
            }
            return result;
        };
    }
});
