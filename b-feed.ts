/*
    Example of usage
*/

/// <reference path="bem.d.ts" />

module Partner.Blocks.Feed {
 
    interface FeedParams {
	    url: string;
	    field: string;
	    error_content?: string;
    }

    interface FeedMap {
	    [key:string]: FeedBlock[];
    }
 
    interface FeedResponse {
	    [fieldName: string] : string;
    }
 
    class FeedMgr {
	    feeds : FeedMap = {};
	    constructor() {
	        this.pull();
	    }
	
	    pull(feed?: FeedBlock) {
	        if ( feed && this.feeds[feed.params.url] ) {
		    var url = feed.params.url;
		        this.puller(this.feeds[url], url);
	        }
	        else {
		        $.each(this.feeds, (u, f) => this.puller(f, u));
	        }
	    }
 
	    puller(feeds: FeedBlock[], url: string) {
	        var def = $.ajax(url, {
	                type: 'get',
	                data: { ajax: 1 },
	            })
	            .success((resp: FeedResponse) => {
		            feeds.forEach((f: FeedBlock) => {
			            var field = f.params.field;
			            if ( field in resp ) {
			                f.setContent(resp[field]);
			            }
			            else {
			                f.showError();
			            }
		            });
		        })
	            .error(() => {
		            feeds.forEach((f: FeedBlock) => {
			            f.showError();
		            })
		        });
	        return def;
	    }
	
	    addFeed(feed: FeedBlock) {
	        var url = feed.params.url;
	        if ( !this.feeds[url] ) {
		        this.feeds[url] = [feed];
	        }
	        else {
		        this.feeds[url].push(feed);
	        }
	    }
    }
 
    var feedMgr: FeedMgr;
 
    $(function() {
	    feedMgr = new FeedMgr();
    });

    class FeedBlock extends DomBlock {

        params: FeedParams;

        description() {
            return {
                name: 'b-feed',
                onSetMod: {
                    js: function () {
                        this.init();
                    }
                }
            }
        }

        init() {
            feedMgr.addFeed(this);
            this.elem('loader').show();
        }

        showError() {
            var error = this.params.error_content;
            this.setContent(error);
            this.setMod('error', 'yes');
        }

        setContent(content: string) {
            this.domElem.html(content);
        }
    }
}