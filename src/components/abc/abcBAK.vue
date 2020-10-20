<template>
  <div>
    <div ref="main">
      <div v-show="slidList.length<=0">{{'No Info' | translate}}</div>
      <swiper auto :list="slidList" v-model="swiper1_index" @on-index-change="onIndexChange"></swiper>
      <!--<swiper auto>
        <swiper-item  @click.native="onItemClick(0)" class="black" style='background-image:url(./mel01.jpg); background-size:100% 100%;opacity: 0.7;'>
        </swiper-item>
        <swiper-item  @click.native="onItemClick(0)" class="black" style='background-image:url(./mel02.jpg); background-size:100% 100%;opacity: 0.7;'>
        </swiper-item>
        <swiper-item  @click.native="onItemClick(0)" class="black" style='background-image:url(./mel03.jpg); background-size:100% 100%;opacity: 0.7;'>
        </swiper-item>
      </swiper> -->
      <swiper class="swiper-container" v-model="index" height="900px" :show-dots="false">
        <swiper-item class="swiperTab"  :key="0">
          <div v-show="update" class="content-container">
            <div ></div>
            <div class="enPara" v-show="paramId===1 && eng==='en'">
              <h1 class="title">{{'gallery' | translate}}</h1>
              <div class="address">
                <div class="img"><img src="http://18.180.147.97:8080/hotme/pics/at.png" alt=""></div>
                <div class="addrtxt">Address:180 St Kilda Rd, Melbourne VIC 3006, Australia</div>
              </div>
              <gmap-street-view-panorama ref="streetView" v-if="showStreetView" id="pano"
                                         :position="{lat: positions[2].lat, lng: positions[2].lng}"
                                         :pov="{ heading: -10, pitch: 10}"
                                         :motionTracking="false"
              ></gmap-street-view-panorama>
              <p>The National Gallery of Victoria is Australia's oldest and most visited public art gallery. It was first opened in 1968 and now holds more than 40 exhibitions each year, including various exhibitions, programs and events of contemporary art and fashion and design, as well as major international historical exhibitions. Today the art gallery has more than 70,000 works of art, including works by Australian aboriginals. The colourful stained glass ceiling in its Great Hall is very famous, and visitors can lie on the floor and watch.</p>
            </div>
            <div class="zhPara" v-show="paramId===1 && eng==='zh-CN'">
              <h1 class="title">{{'gallery' | translate}}</h1>
              <div class="address">
                <div class="img"><img src="http://18.180.147.97:8080/hotme/pics/at.png" alt=""></div>
                <div class="addrtxt">地址：澳大利亚维多利亚州墨尔本圣凯尔达路180号</div>
              </div>
              <gmap-street-view-panorama ref="streetView" v-if="showStreetView" id="pano"
                                         :position="{lat: positions[2].lat, lng: positions[2].lng}"
                                         :pov="{ heading: -10, pitch: 10}"
                                         :motionTracking="false"
              ></gmap-street-view-panorama>
              <p>维多利亚国家美术馆是澳大利亚历史最悠久，访问量最大的公共美术馆。它最初于1968年开放，如今每年都会举办40多次展览，内容包括从当代艺术到时尚与设计主题的各种展览，项目和活动，以及国际上的重大历史展览。如今美术馆拥有超过70,000件艺术品，包含澳大利亚的原住民作品。其大会堂中的彩色玻璃天花板非常有名，游客可以躺在地板上进行观赏。</p>
            </div>
            <div class="enPara" v-show="paramId===3 && eng==='en'">
              <h1 class="title">{{'zoo' | translate}}</h1>
              <div class="address">
                <div class="img"><img src="http://18.180.147.97:8080/hotme/pics/at.png" alt=""></div>
                <div class="addrtxt">Address:Elliott Ave, Parkville VIC 3052, Australia</div>
              </div>
              <gmap-street-view-panorama ref="streetView" v-if="showStreetView" id="pano"
                                         :position="{lat: positions[1].lat, lng: positions[1].lng}"
                                         :pov="{ heading: -10, pitch: 10}"
                                         :motionTracking="false"
              ></gmap-street-view-panorama>
              <p>The history of Melbourne Zoo can be traced back to 1862. Here you can find more than 320 species of animals from all over the world. It is a super large wildlife world. Its themes include Asian and African rainforests, Australian bushland, even underwater! You can stroll around where tigers rest and monkeys climb, explore elephants, koalas and kangaroos along jungle trails, or immerse yourself in the underwater world to admire little penguins and Australian fur seals. . . There are more interesting things there, and you can participate in activities and enjoy the performance. Melbourne Zoo has been voted as the most favorite metro attraction by Victorians in 2015 and 2016.</p>
            </div>
            <div class="zhPara" v-show="paramId===3 && eng==='zh-CN'">
              <h1 class="title">{{'zoo' | translate}}</h1>
              <div class="address">
                <div class="img"><img src="http://18.180.147.97:8080/hotme/pics/at.png" alt=""></div>
                <div class="addrtxt">地址：澳大利亚维多利亚州 Elliott 大街</div>
              </div>
              <gmap-street-view-panorama ref="streetView" v-if="showStreetView" id="pano"
                                         :position="{lat: positions[1].lat, lng: positions[1].lng}"
                                         :pov="{ heading: -10, pitch: 10}"
                                         :motionTracking="false"
              ></gmap-street-view-panorama>
              <p>墨尔本动物园的历史可以追溯到1862年，在这里你可以发现来自世界各地的320多种动物，是一个超级大的野生动植物世界。它的主题有亚洲和非洲雨林，澳大利亚丛林等等，甚至水下！你可以漫步在老虎休息或猴子攀爬的地方，沿着丛林小径探索大象、考拉或者袋鼠，或者沉浸在海底世界欣赏小企鹅和澳大利亚海狗。。。那里还有更多有趣的东西，你可以参加活动以及欣赏表演。墨尔本动物园连续在2015年和2016年都被维多利亚人评为最喜欢的都市景点。</p>
            </div>
            <div class="enPara" v-show="paramId===4 && eng==='en'">
              <h1 class="title">{{'university' | translate}}</h1>
              <div class="address">
                <div class="img"><img src="http://18.180.147.97:8080/hotme/pics/at.png" alt=""></div>
                <div class="addrtxt">Address:Parkville VIC 3010, Australia</div>
              </div>
              <gmap-street-view-panorama ref="streetView" v-if="showStreetView" id="pano"
                                         :position="{lat: positions[10].lat, lng: positions[10].lng}"
                                         :pov="{ heading: -10, pitch: 10}"
                                         :motionTracking="false"
              ></gmap-street-view-panorama>
              <p>The University of Melbourne founded in 1853, is the second oldest university in Australia, the oldest university in Victoria, and one of the most beautiful and inspiring university campuses in the world. In the history of Australia, four prime ministers and five governors have graduated from the University of Melbourne, and 10 Nobel Prize winners were students or teachers of the University of Melbourne. The University has many activities and places that are open to the public, such as the farmers market every Wednesday in the semester selling organic produce, bread and honey, etc., and the 8 galleries and museums on campus exhibiting rare historical materials and unique sculptures, murals, artworks and so on.</p>
            </div>
            <div class="zhPara" v-show="paramId===4 && eng==='zh-CN'">
              <h1 class="title">{{'university' | translate}}</h1>
              <div class="address">
                <div class="img"><img src="http://18.180.147.97:8080/hotme/pics/at.png" alt=""></div>
                <div class="addrtxt">地址：澳大利亚维多利亚州 Parkville 3010</div>
              </div>
              <gmap-street-view-panorama ref="streetView" v-if="showStreetView" id="pano"
                                         :position="{lat: positions[10].lat, lng: positions[10].lng}"
                                         :pov="{ heading: -10, pitch: 10}"
                                         :motionTracking="false"
              ></gmap-street-view-panorama>
              <p>墨尔本大学成立于1853年，是澳大利亚第二古老的大学，也是维多利亚最古老的大学，同时还是世界上最美丽和令人鼓舞的大学校园之一。澳大利亚历史上有四位总理和五位州长从墨尔本大学毕业，同时也有10名诺贝尔奖获得者为墨尔本大学的学生或教师。墨尔本大学有不少对外开放的活动和地方，比如学期中每周三的农贸市场出售有机农产品，面包和蜂蜜等等，以及校园内的8个画廊和博物馆展出稀有的历史资料和独特的雕塑，壁画，艺术品等等。</p>
            </div>
            <div class="enPara" v-show="paramId===5 && eng==='en'">
              <h1 class="title">{{'gaol' | translate}}</h1>
              <div class="address">
                <div class="img"><img src="http://18.180.147.97:8080/hotme/pics/at.png" alt=""></div>
                <div class="addrtxt">Address:377 Russell St, Melbourne VIC 3000, Australia</div>
              </div>
              <gmap-street-view-panorama ref="streetView" v-if="showStreetView" id="pano"
                                         :position="{lat: positions[3].lat, lng: positions[3].lng}"
                                         :pov="{ heading: -10, pitch: 10}"
                                         :motionTracking="false"
              ></gmap-street-view-panorama>
              <p>This is Melbourne's oldest prison, the historic magistrate court and the former police city watchhouse. Experience going back in time here, walking on the gallows road in a 19th century prison, pretending to be arrested by a modern police station and being trialed in a court here. Since the 1840s, the street where the old gaol is located (Russell Street) has been the center of crime, law and order in Melbourne. Most of Australia's notorious characters, such as the iconic bushranger Ned Kelly and the infamous gangster Squizzy Taylor, have spent their time in this place. In the old Melbourne gaol, you can learn about the past, present and future of Australian crime and justice.</p>
            </div>
            <div class="zhPara" v-show="paramId===5 && eng==='zh-CN'">
              <h1 class="title">{{'gaol' | translate}}</h1>
              <div class="address">
                <div class="img"><img src="http://18.180.147.97:8080/hotme/pics/at.png" alt=""></div>
                <div class="addrtxt">地址：澳大利亚维多利亚州圣罗素大街377号</div>
              </div>
              <gmap-street-view-panorama ref="streetView" v-if="showStreetView" id="pano"
                                         :position="{lat: positions[3].lat, lng: positions[3].lng}"
                                         :pov="{ heading: -10, pitch: 10}"
                                         :motionTracking="false"
              ></gmap-street-view-panorama>
              <p>这是墨尔本最古老的监狱，历史悠久的地方法院和前警察城市守望所。在这里体验时光倒流，走上19世纪监狱中的绞刑架之路，假装被现代的警察局逮捕之后在这里的法庭上受审。自1840年代以来，该旧监狱所在的街道（罗素街）就一直是墨尔本犯罪，法律与秩序的中心。 澳大利亚大多数臭名昭著的人物，比如标志性的丛林游侠Ned Kelly和黑帮老大Squizzy Taylor，都在这个地方度过了时光。在旧墨尔本监狱，你可以了解到澳大利亚犯罪与正义的过去，现在和未来。</p>
            </div>
            <div class="enPara" v-show="paramId===7 && eng==='en'">
              <h1 class="title">{{'station' | translate}}</h1>
              <div class="address">
                <div class="img"><img src="http://18.180.147.97:8080/hotme/pics/at.png" alt=""></div>
                <div class="addrtxt">Address:Flinders St, Melbourne VIC 3000, Australia</div>
              </div>
              <gmap-street-view-panorama ref="streetView" v-if="showStreetView" id="pano"
                                         :position="{lat: positions[4].lat, lng: positions[4].lng}"
                                         :pov="{ heading: -10, pitch: 10}"
                                         :motionTracking="false"
              ></gmap-street-view-panorama>
              <p>Flinders Street Railway Station opened in 1854 and now serves the entire metropolitan rail network and the east of Victoria. It is the busiest station on the Melbourne Metropolitan Network and the terminus of Australia's first railway (Port Melbourne Line). The platform in the railway station is the longest in Australia and the fourth longest in the world. The current main building of the station was completed in 1909 and is a cultural symbol of Melbourne. Its unique and eclectic Edwardian building, with a prominent dome, arched entrance, tower and clocks has become one of the city’s most well-known landmarks. Since 1982, Flinders Street Railway Station has been included in the Victorian Heritage Register.</p>
            </div>
            <div class="zhPara" v-show="paramId===7 && eng==='zh-CN'">
              <h1 class="title">{{'station' | translate}}</h1>
              <div class="address">
                <div class="img"><img src="http://18.180.147.97:8080/hotme/pics/at.png" alt=""></div>
                <div class="addrtxt">地址：澳大利亚墨尔本弗林得大街</div>
              </div>
              <gmap-street-view-panorama ref="streetView" v-if="showStreetView" id="pano"
                                         :position="{lat: positions[4].lat, lng: positions[4].lng}"
                                         :pov="{ heading: -10, pitch: 10}"
                                         :motionTracking="false"
              ></gmap-street-view-panorama>
              <p>弗林德斯街火车站于1854年开放，如今为整个都会铁路网以及通往维多利亚东部提供服务。它是墨尔本都会铁路网上最繁忙的车站，也是澳大利亚第一条铁路（墨尔本港线）的终点站。火车站内的站台是澳大利亚最长，也是世界上第四长的铁路站台。该车站目前的主楼于1909年完工，是墨尔本的文化标志。它独特而折衷的爱德华七世时代建筑，与其突出的圆顶，拱形的入口，塔楼和钟表成为该市最知名的地标之一。自1982年以来，弗林德斯街火车站就已被列入维多利亚时代遗产名录。</p>
            </div>
            <div class="enPara" v-show="paramId===9 && eng==='en'">
              <h1 class="title">{{'arena' | translate}}</h1>
              <div class="address">
                <div class="img"><img src="http://18.180.147.97:8080/hotme/pics/at.png" alt=""></div>
                <div class="addrtxt">Address:Olympic Blvd, Melbourne VIC 3001, Australia</div>
              </div>
              <gmap-street-view-panorama ref="streetView" v-if="showStreetView" id="pano"
                                         :position="{lat: positions[5].lat, lng: positions[5].lng}"
                                         :pov="{ heading: -10, pitch: 10}"
                                         :motionTracking="false"
              ></gmap-street-view-panorama>
              <p>Rod Laver Arena is a multi-purpose arena located in Melbourne Park. It was completed in 1988 and is part of the original National Tennis Center complex. The arena is the core of the Australian Open and the main venue for the first Grand Slam tennis tournament. It also hosts various other sports and entertainment events, from tennis matches to international rock stars and motorcycle supercross races. Rod Laver Arena has a total of 14,820 seats and hosts more than one million people each year.</p>
            </div>
            <div class="zhPara" v-show="paramId===9 && eng==='zh-CN'">
              <h1 class="title">{{'arena' | translate}}</h1>
              <div class="address">
                <div class="img"><img src="http://18.180.147.97:8080/hotme/pics/at.png" alt=""></div>
                <div class="addrtxt">地址：澳大利亚墨尔本市墨尔本公园</div>
              </div>
              <gmap-street-view-panorama ref="streetView" v-if="showStreetView" id="pano"
                                         :position="{lat: positions[5].lat, lng: positions[5].lng}"
                                         :pov="{ heading: -10, pitch: 10}"
                                         :motionTracking="false"
              ></gmap-street-view-panorama>
              <p>Rod Laver Arena是一个多功能竞技场，位于墨尔本公园内，于1988年建成，是最初的国家网球中心综合大楼的一部分。竞技场是澳大利亚网球公开赛的核心，也是首个大满贯网球锦标赛的主要场地。它同时也举办其他各种体育和娱乐活动，从网球比赛到国际摇滚明星表演和摩托车超级越野赛。 Rod Laver Arena共有14,820个座位，每年接待超过一百万人。</p>
            </div>
            <div class="enPara" v-show="paramId===11 && eng==='en'">
              <h1 class="title">{{'library' | translate}}</h1>
              <div class="address">
                <div class="img"><img src="http://18.180.147.97:8080/hotme/pics/at.png" alt=""></div>
                <div class="addrtxt">Address:328 Swanston St, Melbourne VIC 3000, Australia</div>
              </div>
              <gmap-street-view-panorama ref="streetView" v-if="showStreetView" id="pano"
                                         :position="{lat: positions[0].lat, lng: positions[0].lng}"
                                         :pov="{ heading: -10, pitch: 10}"
                                         :motionTracking="false"
              ></gmap-street-view-panorama>
              <p>Established in 1854 as the Melbourne Public Library, State Library Victoria is Australia's oldest public library and one of the first free public libraries in the world.Our founders believed that access to knowledge was critical for the development of a civil and prosperous community, and created the Library as 'the people’s university' – a place of learning and discovery for all Victorians. They also charged the Library with preserving Victoria's heritage by collecting items of historical and cultural significance for future generations.These are responsibilities that remain a critical focus today. Each year we add more than 70,000 heritage items to the Library’s rich collection and lead the sector with our ambitious digitisation programs. We also work hard to adapt and remain relevant to our Library users, as well as reach out to new audiences. As a result, Library patronage has continued to increase, with almost two million physical visits to the Library annually and over 4.3 million annual online visits.</p>
            </div>
            <div class="zhPara" v-show="paramId===11 && eng==='zh-CN'">
              <h1 class="title">{{'library' | translate}}</h1>
              <div class="address">
                <div class="img"><img src="http://18.180.147.97:8080/hotme/pics/at.png" alt=""></div>
                <div class="addrtxt">地址：澳大利亚维多利亚墨尔本斯瓦斯通大街328号</div>
              </div>
              <gmap-street-view-panorama ref="streetView" v-if="showStreetView" id="pano"
                                         :position="{lat: positions[0].lat, lng: positions[0].lng}"
                                         :pov="{ heading: -10, pitch: 10}"
                                         :motionTracking="false"
              ></gmap-street-view-panorama>
              <p>维多利亚州立图书馆成立于1854年，是澳大利亚历史最悠久的公共图书馆，也是世界上最早的免费公共图书馆之一。创始人认为，获取知识对发展一个文明繁荣的社区至关重要，并将图书馆创建为“人民大学”——所有维多利亚人学习和发现的地方。他们还责成图书馆通过为后代收集具有历史和文化意义的物品来保护维多利亚的遗产。 这些责任今天仍然是一个关键的焦点。每年都会在图书馆丰富的藏品中增加超过70000件文物，并通过雄心勃勃的数字化计划引领该行业。努力适应和保持与图书馆用户的关系，并接触新的读者。因此，图书馆的光顾量继续增加，每年有近200万人次实际访问图书馆，每年有430多万人次在线访问。</p>
            </div>
            <div class="enPara" v-show="paramId===12 && eng==='en'">
              <h1 class="title">{{'museum' | translate}}</h1>
              <div class="address">
                <div class="img"><img src="http://18.180.147.97:8080/hotme/pics/at.png" alt=""></div>
                <div class="addrtxt">Address:11 Nicholson St, Carlton VIC 3053, Australia</div>
              </div>
              <gmap-street-view-panorama ref="streetView" v-if="showStreetView" id="pano"
                                         :position="{lat: positions[6].lat, lng: positions[6].lng}"
                                         :pov="{ heading: -10, pitch: 10}"
                                         :motionTracking="false"
              ></gmap-street-view-panorama>
              <p>A visit to Melbourne Museum is a rich, surprising insight into life in Victoria. We show you Victoria's intriguing permanent collections and bring you brilliant temporary exhibitions from near and far. You'll see our natural environment, our cultures and our history through different perspectives.We left our old home in the State Library Building in 1997, and into a building located in Carlton Gardens that was designed by Denton Corker Marshall. The new Melbourne Museum reopened on 21 October 2000.</p>
            </div>
            <div class="zhPara" v-show="paramId===12 && eng==='zh-CN'">
              <h1 class="title">{{'museum' | translate}}</h1>
              <div class="address">
                <div class="img"><img src="http://18.180.147.97:8080/hotme/pics/at.png" alt=""></div>
                <div class="addrtxt">地址：澳大利亚墨尔本市卡尔通尼克森街11号</div>
              </div>
              <gmap-street-view-panorama ref="streetView" v-if="showStreetView" id="pano"
                                         :position="{lat: positions[6].lat, lng: positions[6].lng}"
                                         :pov="{ heading: -10, pitch: 10}"
                                         :motionTracking="false"
              ></gmap-street-view-panorama>
              <p>参观墨尔本博物馆对维多利亚的生活有着丰富而令人惊讶的见解。展示维多利亚迷人的永久收藏品，并为您带来来自远近的精彩临时展览。可以从不同的角度了解我们的自然环境、文化和历史。1997年，墨尔本博物馆离开了位于国家图书馆大楼的老房子，进入了位于卡尔顿花园（Carlton Gardens）的一座由丹顿•科克•马歇尔（Denton Corker Marshall）设计的建筑。新墨尔本博物馆于2000年10月21日重新开放。</p>
            </div>
            <div class="enPara" v-show="paramId===13 && eng==='en'">
              <h1 class="title">{{'cathedral' | translate}}</h1>
              <div class="address">
                <div class="img"><img src="http://18.180.147.97:8080/hotme/pics/at.png" alt=""></div>
                <div class="addrtxt">Address:Flinders St, Melbourne VIC 3000, Australia</div>
              </div>
              <gmap-street-view-panorama ref="streetView" v-if="showStreetView" id="pano"
                                         :position="{lat: positions[7].lat, lng: positions[7].lng}"
                                         :pov="{ heading: -10, pitch: 10}"
                                         :motionTracking="false"
              ></gmap-street-view-panorama>
              <p>St Paul’s stands at the very heart of the City of Melbourne. In style, it echoes the grand Cathedrals of Europe. Designed by distinguished English revival architect William Butterfield, the Cathedral is built in the neo-Gothic transitional style, partly Early English and partly Decorated. Many consider St Paul’s to be Butterfield’s final masterpiece.St Paul’s Cathedral has been an integral part of Christian Melbourne since the city’s foundation: it stands on the site where the first public Christian services in Melbourne were led by Dr Alexander Thomson in 1836.From 1836 to 1848 the site on which the Cathedral stands served as a corn market for the growing city. In 1848, it was granted to the Anglican Church to build the bluestone St Paul’s Parish Church. Consecrated in 1852, St Paul’s Church was used until 1885 when it was demolished to make way for the liturgical West-end of the present Cathedral.The Cathedral’s foundation stone was laid in 1880, and work continued for eleven years, leading to the consecration of St Paul’s Cathedral on 22 January 1891.The construction of the three spires did not begin until 1926, to a revised design of John Barr of Sydney rather than the original design of an octagonal central tower and gable west end towers of Butterfield. The central spire is the second highest in the Anglican Communion, after Salisbury Cathedral.Like European Cathedrals, St Paul’s also relies on the services of traditional craftspeople to maintain the historic building. In the 1960s a first restoration of the exterior of the Cathedral took place, in 1989 the Cathedral’s magnificent organ was restored. In 2009, extensive restoration works were carried out to the exterior and interior of the Cathedral. More recently, the historic office buildings at St Paul’s House, immediately adjacent to the Cathedral were extensively restored to provide new ministry and administrative facilities for the Cathedral and Diocese of Melbourne.</p>
            </div>
            <div class="zhPara" v-show="paramId===13 && eng==='zh-CN'">
              <h1 class="title">{{'cathedral' | translate}}</h1>
              <div class="address">
                <div class="img"><img src="http://18.180.147.97:8080/hotme/pics/at.png" alt=""></div>
                <div class="addrtxt">地址：澳大利亚墨尔本弗林得街</div>
              </div>
              <gmap-street-view-panorama ref="streetView" v-if="showStreetView" id="pano"
                                         :position="{lat: positions[7].lat, lng: positions[7].lng}"
                                         :pov="{ heading: -10, pitch: 10}"
                                         :motionTracking="false"
              ></gmap-street-view-panorama>
              <p>圣保罗位于墨尔本市中心。在风格上，它与欧洲宏伟的大教堂遥相呼应。这座大教堂由杰出的英国复兴派建筑师威廉•巴特菲尔德（William Butterfield）设计，采用新哥特式过渡风格，部分为早期英国风格，部分为装饰。许多人认为圣保罗是巴特菲尔德最后的杰作。 圣保罗大教堂自该城成立以来一直是基督教墨尔本的一个组成部分：它位于1836墨尔本Alexander Thomson第一次公共基督教服务的地点。1836至1848年间，大教堂所在地为日益增长的城市提供了玉米市场。1848年，英国圣公会受权建造蓝石圣保罗教区教堂。圣保罗教堂于1852年被神圣化，直到1885年被拆毁，为现在大教堂的西端让路。大教堂的基石建于1880，工作持续了十一年，导致1891年1月22日圣保罗大教堂的奉献。三座尖塔的建造直到1926才开始，改为悉尼的John Barr的设计，而不是一座八角形中央塔和盖博西端的最初设计。巴特菲尔德的塔楼。中央尖顶是圣公会中第二高的，仅次于索尔兹伯里大教堂。与欧洲的大教堂一样，圣保罗教堂也依靠传统工匠的服务来维护这座历史建筑。20世纪60年代，第一次对大教堂外观进行了修复，1989年，大教堂宏伟的风琴被修复。2009年，对大教堂的外部和内部进行了广泛的修复工作。最近，紧靠大教堂的圣保罗之家历史悠久的办公楼被广泛修复，为墨尔本大教堂和教区提供新的牧师和行政设施。</p>
            </div>
            <div class="enPara" v-show="paramId===14 && eng==='en'">
              <h1 class="title">{{'aquarium' | translate}}</h1>
              <div class="address">
                <div class="img"><img src="http://18.180.147.97:8080/hotme/pics/at.png" alt=""></div>
                <div class="addrtxt">Address:King Street corner, Flinders St, Melbourne VIC 3000, Australia</div>
              </div>
              <gmap-street-view-panorama ref="streetView" v-if="showStreetView" id="pano"
                                         :position="{lat: positions[8].lat, lng: positions[8].lng}"
                                         :pov="{ heading: -10, pitch: 10}"
                                         :motionTracking="false"
              ></gmap-street-view-panorama>
              <p>Sea Life Melbourne Aquarium is a Southern Ocean and Antarctic aquarium in central Melbourne, Australia. It is located on the banks of the Yarra River beside and under the Flinders Street Viaduct and the King Street Bridge. The attraction is a Sea Life Centre owned by Merlin Entertainments.The current building was built between February 1998 and December 1999,[1] the building was designed by Peddle Thorp architects to resemble a ship moored to the river, and opened in January 2000.[2] The depth of the building however was designed not to be imposing at street level, and extends 7 metres (23 ft) below the surface. At its centre is a world first 2,200,000-litre (580,000 US gal) 'oceanarium in the round' where the spectators become the spectacle to the marine life swimming around them.</p>
            </div>
            <div class="zhPara" v-show="paramId===14 && eng==='zh-CN'">
              <h1 class="title">{{'aquarium' | translate}}</h1>
              <div class="address">
                <div class="img"><img src="http://18.180.147.97:8080/hotme/pics/at.png" alt=""></div>
                <div class="addrtxt">地址：澳大利亚墨尔本King街口弗林得大街</div>
              </div>
              <gmap-street-view-panorama ref="streetView" v-if="showStreetView" id="pano"
                                         :position="{lat: positions[8].lat, lng: positions[8].lng}"
                                         :pov="{ heading: -10, pitch: 10}"
                                         :motionTracking="false"
              ></gmap-street-view-panorama>
              <p>墨尔本海洋生物水族馆是一个位于澳大利亚墨尔本中部的南大洋和南极水族馆。它位于雅拉河畔，弗林德斯街高架桥和国王街大桥旁边和下面。该景点是梅林娱乐公司拥有的海洋生活中心。 目前的建筑建于1998年2月至1999年12月之间，[1]该建筑由Peddle Thorp建筑师设计，类似于停泊在河上的船，并于2000年1月开放。[2]但是，建筑的深度设计为在街道平面上不显得气势逼人，并延伸至水面以下7米（23英尺）。在它的中心是世界上第一个2200000升（580000美制加仑）的“圆形海洋馆”，在这里，观众成为周围海洋生物游泳的奇观。</p>
            </div>
            <div class="enPara" v-show="paramId===15 && eng==='en'">
              <h1 class="title">{{'casino' | translate}}</h1>
              <div class="address">
                <div class="img"><img src="http://18.180.147.97:8080/hotme/pics/at.png" alt=""></div>
                <div class="addrtxt">Address:8 Whiteman St, Southbank VIC 3006, Australia</div>
              </div>
              <gmap-street-view-panorama ref="streetView" v-if="showStreetView" id="pano"
                                         :position="{lat: positions[9].lat, lng: positions[9].lng}"
                                         :pov="{ heading: -10, pitch: 10}"
                                         :motionTracking="false"
              ></gmap-street-view-panorama>
              <p>Crown Melbourne (also referred to as Crown Casino and Entertainment Complex) is a casino and resort located on the south bank of the Yarra River, in Melbourne, Australia. Crown Casino is a unit of Crown Limited, and the first casino of the now-international Crown brand. Initially having opened in 1994 on the north bank of the Yarra, Crown Melbourne relocated and re–opened on the south bank of the Yarra, in 1997. It remains one of the central features of the Southbank precinct of the Melbourne central business district. The entire complex has a space of 510,000 m²—the equivalent to two city blocks—making it the largest casino complex in the Southern Hemisphere and one of the largest in the world. The complex also hosts four hotels, Crown Towers, Crown Promenade, and Crown Metropol, with a fourth hotel approved for construction which is expected to commence in 2018.The casino is accessible by tram routes 12, 58, 96, 109 which all pass near Southern Cross railway station and the Melbourne City Centre.</p>
            </div>
            <div class="zhPara" v-show="paramId===15 && eng==='zh-CN'">
              <h1 class="title">{{'casino' | translate}}</h1>
              <div class="address">
                <div class="img"><img src="http://18.180.147.97:8080/hotme/pics/at.png" alt=""></div>
                <div class="addrtxt">地址：澳大利亚怀特曼大街8号</div>
              </div>
              <gmap-street-view-panorama ref="streetView" v-if="showStreetView" id="pano"
                                         :position="{lat: positions[9].lat, lng: positions[9].lng}"
                                         :pov="{ heading: -10, pitch: 10}"
                                         :motionTracking="false"
              ></gmap-street-view-panorama>
              <p>皇冠墨尔本（也称为皇冠赌场和娱乐综合体）是一家赌场和度假村，位于澳大利亚墨尔本雅拉河南岸。皇冠赌场是皇冠有限公司的一个单位，也是现在国际皇冠品牌的第一家赌场。              墨尔本皇冠酒店于1994年在雅拉河北岸开业，1997年在雅拉河南岸重新开业。它仍然是墨尔本中央商务区南岸区的中心特色之一。整个建筑群占地51万平方米，相当于两个城市街区，是南半球最大的赌场综合体，也是世界上最大的赌场之一。该建筑群还拥有四家酒店，皇冠大厦、皇冠长廊和皇冠大都会酒店，第四家酒店获批建设，预计将于2018年开工。赌场可通过12、58、96、109号有轨电车线路到达，这些线路都经过南十字车站和墨尔本市中心附近。</p>
            </div>
            <div class="enPara" v-show="paramId===5 && isEn">
              <p></p>
            </div>
            <div class="zhPara" v-show="paramId===5 && !isEn">
              <p></p>
            </div>
          </div>
        </swiper-item>
      </swiper>
    </div>
    <br/>
    <br/>
    <x-button class="btn" @click.native="goBack">{{ `${goback}` }}</x-button>
  </div>
</template>
<i18n>
  No Info:
  zh-CN: 暂无信息
  en: There is no information about it!
</i18n>
<script>
  import { Tab, TabItem } from '../../components/tab'
  import Sticky from '../../components/sticky'
  import Divider from '../../components/divider'
  import XButton from '../../components/x-button'
  import { Swiper, SwiperItem } from '../../components/swiper'
  import Vue from 'vue'
  const list = () => ['精选', '美食', '电影']
  const baseList = [{
    url: 'javascript:',
    img: 'http://18.180.147.97:8080/hotme/pics/homeslid1.jpg', // 'http://39.98.194.195/hotme/pics/homeslid1.jpg',
    title: ''
  }, {
    url: 'javascript:',
    img: 'http://18.180.147.97:8080/hotme/pics/homeslid2.jpg', // 'http://39.98.194.195/hotme/pics/homeslid2.jpg',
    title: ''
  }, {
    url: 'javascript:',
    img: 'http://18.180.147.97:8080/hotme/pics/homeslid3.jpg', // 'http://39.98.194.195/hotme/pics/homeslid3.jpg',
    title: '',
    fallbackImg: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw50iwj20ff0aaaci.jpg'
  }
  ]
  const listArr = []
  listArr[0] = []
  listArr[1] = [{
    url: 'javascript:',
    img: 'http://18.180.147.97:8080/hotme/pics/galleryslid01.png',
    title: ''
  }, {
    url: 'javascript:',
    img: 'http://18.180.147.97:8080/hotme/pics/galleryslid02.png',
    title: ''
  }]
  listArr[2] = []
  listArr[3] = [{
    url: 'javascript:',
    img: 'http://18.180.147.97:8080/hotme/pics/zooslid01.png',
    title: ''
  }, {
    url: 'javascript:',
    img: 'http://18.180.147.97:8080/hotme/pics/zooslid02.png',
    title: ''
  }]
  listArr[4] = [{
    url: 'javascript:',
    img: 'http://18.180.147.97:8080/hotme/pics/universityslid01.png',
    title: ''
  }, {
    url: 'javascript:',
    img: 'http://18.180.147.97:8080/hotme/pics/universityslid02.png',
    title: ''
  }]
  listArr[5] = [{
    url: 'javascript:',
    img: 'http://18.180.147.97:8080/hotme/pics/goalslid01.png',
    title: ''
  }, {
    url: 'javascript:',
    img: 'http://18.180.147.97:8080/hotme/pics/goalslid02.png',
    title: ''
  }]
  listArr[6] = []
  listArr[7] = [{
    url: 'javascript:',
    img: 'http://18.180.147.97:8080/hotme/pics/stationslid01.png',
    title: ''
  }, {
    url: 'javascript:',
    img: 'http://18.180.147.97:8080/hotme/pics/stationslid02.png',
    title: ''
  }]
  listArr[8] = []
  listArr[9] = [{
    url: 'javascript:',
    img: 'http://18.180.147.97:8080/hotme/pics/arenaslid01.png',
    title: ''
  }, {
    url: 'javascript:',
    img: 'http://18.180.147.97:8080/hotme/pics/arenaslid02.png',
    title: ''
  }]
  listArr[10] = []
  listArr[11] = [{
    url: 'javascript:',
    img: 'http://18.180.147.97:8080/hotme/pics/libraryslid01.png',
    title: ''
  }, {
    url: 'javascript:',
    img: 'http://18.180.147.97:8080/hotme/pics/libraryslid02.png',
    title: ''
  }, {
    url: 'javascript:',
    img: 'http://18.180.147.97:8080/hotme/pics/libraryslid03.png',
    title: ''
  }]
  listArr[12] = [{
    url: 'javascript:',
    img: 'http://18.180.147.97:8080/hotme/pics/museumslid01.png',
    title: ''
  }, {
    url: 'javascript:',
    img: 'http://18.180.147.97:8080/hotme/pics/museumslid02.png',
    title: ''
  }]
  listArr[13] = [{
    url: 'javascript:',
    img: 'http://18.180.147.97:8080/hotme/pics/cathedralslid01.png',
    title: ''
  }, {
    url: 'javascript:',
    img: 'http://18.180.147.97:8080/hotme/pics/cathedralslid02.png',
    title: ''
  }]
  listArr[14] = [{
    url: 'javascript:',
    img: 'http://18.180.147.97:8080/hotme/pics/aquariumslid01.png',
    title: ''
  }, {
    url: 'javascript:',
    img: 'http://18.180.147.97:8080/hotme/pics/aquariumslid02.png',
    title: ''
  }]
  listArr[15] = [{
    url: 'javascript:',
    img: 'http://18.180.147.97:8080/hotme/pics/casinoslid01.png',
    title: ''
  }, {
    url: 'javascript:',
    img: 'http://18.180.147.97:8080/hotme/pics/casinoslid02.png',
    title: ''
  }]
  listArr[16] = []
  listArr[17] = []
  listArr[18] = []
  export default {
    name: 'abc',
    // <cell :title="`${title}`" link="/a">
    /*
    computed: {
    title () {
      return Vue.i18n.translate('ratings') //'Long'
    }
    */
    components: {
      Tab,
      TabItem,
      Sticky,
      Divider,
      XButton,
      Swiper,
      SwiperItem
    },
    computed: {
      goback () {
        return Vue.i18n.translate('goback')
      },
      slidList () {
        return listArr[this.paramId]
      },
      paramId () {
        return this.$route.params.data
      },
      isEn () {
        if (Vue.locale.get() === 'en') {
          return true
        } else {
          return false
        }
      }
    },
    watch: {
      eng () {
        this.showStreetView = false
        setTimeout(() => {
          this.showStreetView = true
        }, 90)
        console.log('watch eng')
      }
    },
    data () {
      return {
        positions: [
          {label: 'State Library of Victoria', lat: -37.809614, lng: 144.965522},
          {label: 'Melbourne Zoo', lat: -37.7844448, lng: 144.951155},
          {label: 'National Gallery Of Victoria', lat: -37.822501, lng: 144.969325},
          {label: 'Old Gaol Melbourne', lat: -37.807696, lng: 144.965317},
          {label: 'Flinder Street Railway Station', lat: -37.817576,  lng: 144.967341},
          {label: 'Rod Laver Arena', lat: -37.8222549, lng: 144.9797763},
          {label: 'Melbourne Museum', lat: -37.8038825, lng: 144.9715813},
          {label: 'St Paul’s Cathedral', lat: -37.8175268, lng: 144.9674523},
          {label: 'Melbourne Aquarium', lat: -37.8209952, lng: 144.9579414},
          {label: 'Crown Melbourne', lat: -37.8242877, lng: 144.9566494},
          {label: 'University of Melbourne', lat: -37.7993406, lng: 144.9612954}
        ],
        showStreetView: true,
        update: true,
        list1: baseList,
        list2: list(),
        demo2: '美食',
        index: 0,
        locale: '',
        swiper1_index: 0,
        eng: Vue.locale.get(),
        getBarWidth: function (index) {
          return (index + 1) * 22 + 'px'
        }
      }
    },
    created () {
      this.$bus.on('changeLang', (locale) => {
        this.eng = locale
        // console.log('Change Lang: ' + this.locale)
      });
    },
    methods: {
      playGame () {
        this.$router.push('game')
      },
      onIndexChange (index) {
        this.swiper1_index = index
      },
      goBack () {
        this.$router.back();
      },
      onItemClick (index) {
        console.log('on item click:', index)
      },
      next () {
        if (this.index === this.list2.length - 1) {
          this.index = 0
        } else {
          ++this.index
        }
      },
      prev () {
        if (this.index === 0) {
          this.index = this.list2.length - 1
        } else {
          --this.index
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../../styles/1px.less';
  @import '../../styles/center.less';
  @import url('https://fonts.googleapis.com/css?family=Baloo+Tammudu+2|Grandstander|Roboto+Condensed|Lobster|Montserrat|Cabin|Herr+Von+Muellerhoff|Source+Sans+Pro:400,900&display=swap');
  #pano {
    margin: 20px auto;
    left: 0vw;
    width: 90vw;
    height: 95vw;
  }
  .box {
    padding: 15px;
  }
  .tab-swiper {
    background-color: #fff;
    padding-top: 100px;
    height: 100px;
  }
  .content-container {
    margin: 20px 20px 0 20px;
    text-align: left;
    .enPara {
      font-family: 'Baloo Tammudu 2', sans-serif;
      font-weight: 500;
      font-size: 1.5rem;
      .title {
        text-align: center;
        font-size: 2.0rem;
        border-bottom: 1px solid #3c763d;
      }
      .address {
        margin-top: 10px;
        margin-bottom: 10px;
        display: flex;
        border-bottom: 1px solid #3c763d;
        img {
          display: inline-block;
          vertical-align: middle;
          width: 32px;
          height: 48px;
          flex: 0 1 40px;
          animation: scale 1.5s cubic-bezier(0.8,-1.9,0.5,-1.4) infinite;
        }
        .addrtxt {
          flex: 1;
          margin-left: 10px;
          display: inline-block;
          font-size: 1.5rem;
          font-weight: 700
        }
      }
    }
    .zhPara {
      font-family: 'Baloo Tammudu 2', sans-serif;
      font-weight: 500;
      font-size: 1.5rem;
      p {
        text-indent: 2em;
      }
      .title {
        text-align: center;
        font-size: 2.0rem;
        border-bottom: 1px solid #3c763d;
      }
      .address {
        margin-top: 10px;
        margin-bottom: 10px;
        display: flex;
        border-bottom: 1px solid #3c763d;
        img {
          display: inline-block;
          vertical-align: middle;
          width: 32px;
          height: 48px;
          flex: 0 1 40px;
          animation: scale 1.5s cubic-bezier(0.8,-1.9,0.5,-1.4) infinite;
        }
        .addrtxt {
          flex: 1;
          margin-left: 10px;
          display: inline-block;
          font-size: 1.5rem;
          font-weight: 700;
        }
      }
    }
  }
  .swiper-container {
    //background: url("./homebkg1.jpg");
    background-size: 100% 2500px;
    background-repeat: repeat-y;
    background-origin: content-box;
    &:after {
      content: '';
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      background: rgba(0, 0, 0, 0.1);
    }
  }
  .swiperTab {
    overflow-y: auto
  }
  .btn {
    background: #6d9eeb;
    position: absolute;
    bottom: 0px
  }
  @keyframes spin {
    0% {
      transform: rotate(0);
    }
    100% {
      opacity: 1;
      transform: rotate(30deg);
    }
  }
  @keyframes scale {
    0% {
      transform: scale(1.2);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
</style>
