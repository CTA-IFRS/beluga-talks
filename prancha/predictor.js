
function WordPredictor() {
    var nGramTable = null;
    switch (__getLang()) {
        case "pt-BR":
        case "pt": 
            nGramTable = getNGrams_ptBR();
            break;
        case "en-US":
        case "en":
            nGramTable = getNGrams_enUS();
            break;

        default:
            nGramTable = getNGrams_ptBR();
    }
    
    return {
        "ngram_list": nGramTable,
        "preditcNextWords": function (phrase, max_results) {
            var ngram_list = this.ngram_list;
            var value_split = phrase.trim().split(" ");
            var value = value_split[value_split.length - 1];
            var lowcase_value = value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            results = [];

            // Empty input, show the words that area most used
            if (phrase == "") {
                ngram_list.ngram_layers[0].sort(function (a, b) {
                    return (a.use_count > b.use_count) ? -1 : 1;
                })
                .filter(function(ngram) {
                    return (ngram_list.string_table[ngram.string_idx].length > 1);
                })
                .slice(0, max_results)
                .forEach(function (ngram) {
                    results.push(ngram_list.string_table[ngram.string_idx])
                })

                return results;
            }

            
            var ranked_ngrams = [];
            for (var idx = 0; idx < ngram_list.ngram_layers[0].length; ++idx) {
                var ngram = ngram_list.ngram_layers[0][idx];
                var str = ngram_list.string_table[ngram.string_idx];
                var ranked_temp = {
                    "ngram": ngram,
                    "rank": (function () {
                        var string_table = ngram_list.string_table;    
                        var a_offset = string_table[ngram.string_idx]
                                    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                                    .indexOf(lowcase_value);
                        return a_offset < 0 ? Infinity : a_offset;
                    })()
                };

                if (ranked_temp.rank != Infinity) {            
                    ranked_ngrams.push(ranked_temp);
                    
                    ranked_ngrams.sort(function (a, b) {
                        return a.rank - b.rank;
                    });
                    
                    if (ranked_ngrams.length > max_results) ranked_ngrams.pop(); 
                }
            }
            ranked_ngrams = ranked_ngrams.map(function (elm) {return elm.ngram});
            
            if (ranked_ngrams.length > 0) {
                var first_ranked = ranked_ngrams[0];
                var str = ngram_list.string_table[first_ranked.string_idx]
                            .normalize("NFD").replace(/[\u0300-\u036f]/g, "");

                // Perfect match, show next possible ngrams
                if (str == lowcase_value) {
                    first_ranked.next_ngrams_idx
                    .sort(function (a_idx,b_idx) {
                        // At the moment, only consider 2 ngram layers
                        var a_ngram =  ngram_list.ngram_layers[1][a_idx];
                        var b_ngram =  ngram_list.ngram_layers[1][b_idx];
                        return a_ngram.use_count > b_ngram.use_count ? -1 : 1;
                    })
                    .slice(0, max_results)
                    .forEach(function (idx) {
                        var next_ngram = ngram_list.ngram_layers[1][idx];
                        var str = ngram_list.string_table[next_ngram.string_idx];
                        results.push(value + " " + str);
                    });
                } else { // try to autocomplete
                    ranked_ngrams.forEach(function (ngram) {
                        results.push(ngram_list.string_table[ngram.string_idx]);
                    });
                }

            } 

            return results;
        }
    };
}



