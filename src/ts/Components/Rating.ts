import BaseComponent from "../Core/BaseComponent";

class Rating extends BaseComponent {
    private reviewData: any;

    constructor() {
        super();
        this.run();
    }

    run(): void {
        // @ts-ignore
        if (typeof review_data === "undefined") {
            return;
        }
        // @ts-ignore
        this.reviewData = review_data;
        /* Review rating */
        this.post_review();
    }

    post_review() {
        const ratingPassedData = this.reviewData;

        let userAreRated = false;
        const ratingLayout = $('.review-wrapper .rating').first();
        const ghostStars = $('.review-wrapper .ghost-stars').first();
        const ratedStars = $('.review-wrapper .rated-stars').first();


        let ratingAvg = ratedStars.data('rating_avg');
        let ratingCount = ratedStars.data('rating_count');
        let starsLayoutWidth = ratingLayout.prop('clientWidth');
        let ratingMaxCount = ratedStars.data('rating_max_count');

        let post_id = ratingPassedData.post_id;

        upadateStars(ratedStars, ratingAvg, starsLayoutWidth, ratingMaxCount)
        let stars = $('.review-wrapper .rating .star');

        ratingLayout.css('direction', 'ltr');

        let postRageValue = getPostRateValue(post_id);

        stars.on('click', function (e) {
            postRageValue = getPostRateValue(post_id);
            if (postRageValue) {
                alert(`شما قبلا ${postRageValue} ستاره به این پست رای داده اید`);
                return;
            }
            let element = $(e.currentTarget);
            let rateValue = element.data('quality_rating');
            ratePost(rateValue);
        });
        if (postRageValue) {
            return;
        }
        ratingLayout.on('mouseover, mousemove', function (e) {
            if (postRageValue) {
                return;
            }
            let bounds = this.getBoundingClientRect();
            ghostStars.width((e.clientX || 0) - bounds.left);
        });

        ratingLayout.on('mouseleave', function () {
            if (postRageValue) {
                return;
            }
            ghostStars.width(0);
            ratedStars.children('.star').removeClass('fal').addClass('fa');
        });

        function ratePost(rateValue: number) {
            let post_id = ratingPassedData.post_id;
            $.ajax({
                type: 'POST',
                url: ratingPassedData.ajax_url,
                data: {
                    rate_value: rateValue,
                    action: ratingPassedData.action,
                    post_id: post_id,
                    nonce: ratingPassedData.nonce
                },
                dataType: 'json',
                success: function (data) {
                    if (data.success) {
                        ratingCount = data.new_rating_count;
                        upadateStars(ratedStars, data.new_rating_avg, starsLayoutWidth, ratingMaxCount);
                        $('.rating-details .not-rated-message').hide(200);
                        $('.review-wrapper .av-review-title').text(data.message || '');
                        addPostRatingToCookie(post_id, rateValue);
                        ghostStars.remove();
                        alert(data.message)
                    } else {
                        alert(data.error_message)
                    }
                    userAreRated = true;
                },
                error: function (error) {
                    alert('خطا در ثبت امتیاز!');
                }
            });
        }

        function upadateStars(ratedStars: JQuery, rateingAvg: number, layoutWidth: number, maxRate: number) {
            let newGhostStarsWidth = getRatedAvgWidth(rateingAvg, layoutWidth, maxRate);
            ratedStars.attr('data-rating_count', ratingCount);
            ratedStars.attr('data-rating_avg', rateingAvg);
            ratedStars.css('width', newGhostStarsWidth);

            $('.rating-details .detail-average').text(rateingAvg);
            $('.rating-details .detail-count').text(ratingCount);
        }

        function getRatedAvgWidth(ratingAvg: number, layoutWidth: number, maxRate: number) {
            return ratingAvg * layoutWidth / maxRate;
        }

        function addPostRatingToCookie(post_id: number, ratedValue: number) {
            let ratedPosts = JSON.parse(getCookieValue('pg_rated_posts'));
            ratedPosts[post_id] = ratedValue;
            createCookie('pg_rated_posts', JSON.stringify(ratedPosts), 650)
        }

        function getPostRateValue(post_id: number | string) {
            let ratingPostCookie = getCookieValue('pg_rated_posts');
            if (!ratingPostCookie) {
                return false;
            }
            let ratedPosts = JSON.parse(ratingPostCookie);
            return ratedPosts[post_id] || false;
        }

        function createCookie(name: string, value: string, days: number) {
            let expires;
            if (days) {
                const date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = "; expires=" + date.toUTCString();
            } else {
                expires = "";
            }
            document.cookie = name + "=" + value + expires + "; path=/";
        }

        function getCookieValue(name: string): string {
            const value = "; " + document.cookie;
            const parts: string[] = value.split("; " + name + "=");
            if (parts.length >= 2) {
                // @ts-ignore
                return parts.pop().split(";").shift();
            }
            return '{}';
        }
    }

}


export default Rating;