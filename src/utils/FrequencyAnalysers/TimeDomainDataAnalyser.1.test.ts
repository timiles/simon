import TimeDomainDataAnalyser from './TimeDomainDataAnalyser';

describe('TimeDomainDataAnalyser.getFrequencyFromTimeDomainData', () => {

    const sampleRate = 48000;
    const dataArray = new Float32Array([-0.023939400911331177, -0.022641394287347794, -0.021266652271151543, -0.01919350028038025, -0.0159485824406147, -0.012914427556097507, -0.008631388656795025, -0.004372709430754185, 0.00009301216050516814, 0.005217346362769604, 0.009167135693132877, 0.013086950406432152, 0.016972538083791733, 0.020288530737161636, 0.023226069286465645, 0.025562778115272522, 0.026699110865592957, 0.02742054872214794, 0.027069494128227234, 0.02578631229698658, 0.0237315371632576, 0.02086617238819599, 0.017953701317310333, 0.014006259851157665, 0.00930073857307434, 0.004769006744027138, -0.0002795993350446224, -0.005316241644322872, -0.010683598928153515, -0.014794252812862396, -0.019081978127360344, -0.023121992126107216, -0.02543061040341854, -0.02834959328174591, -0.029828917235136032, -0.030307644978165627, -0.03048418089747429, -0.028920866549015045, -0.026796866208314896, -0.024193566292524338, -0.020568590611219406, -0.016254117712378502, -0.01136903464794159, -0.0067559536546468735, -0.0014221994206309319, 0.003822150407359004, 0.008944005705416203, 0.01453863363713026, 0.018786747008562088, 0.02266046032309532, 0.026304293423891068, 0.028309956192970276, 0.030149783939123154, 0.03110145963728428, 0.031005442142486572, 0.029817791655659676, 0.027538791298866272, 0.024704227223992348, 0.021258395165205002, 0.01669585332274437, 0.011565054766833782, 0.00648133410140872, 0.0012299453373998404, -0.004602055065333843, -0.010134780779480934, -0.015097437426447868, -0.020871147513389587, -0.025068163871765137, -0.028363414108753204, -0.03127165883779526, -0.0330556221306324, -0.03423471003770828, -0.03382772207260132, -0.03298095986247063, -0.030941152945160866, -0.027580615133047104, -0.023618018254637718, -0.018788203597068787, -0.013358543626964092, -0.007891327142715454, -0.0022754271049052477, 0.004236202221363783, 0.01021213922649622, 0.015637053176760674, 0.020899586379528046, 0.025504589080810547, 0.02931215986609459, 0.03166842833161354, 0.03345031291246414, 0.03446066752076149, 0.034215301275253296, 0.03279097378253937, 0.03027096576988697, 0.027242586016654968, 0.02297521010041237, 0.0180587787181139, 0.012726955115795135, 0.006917649880051613, 0.0014180259313434362, -0.0044418806210160255, -0.010177865624427795, -0.015242848545312881, -0.020716585218906403, -0.02516545169055462, -0.02833157777786255, -0.03098217025399208, -0.03268255293369293, -0.03344050049781799, -0.03295841068029404, -0.03173437342047691, -0.029724104329943657, -0.026854321360588074, -0.02327810600399971, -0.018488401547074318, -0.01367095299065113, -0.00846248958259821, -0.002676089061424136, 0.0023511252366006374, 0.007670493330806494, 0.012888481840491295, 0.01722228154540062, 0.02153012529015541, 0.025278102606534958, 0.02814383991062641, 0.03063451498746872, 0.03198762610554695, 0.03238961845636368, 0.03224501013755798, 0.03057703748345375, 0.027717022225260735, 0.024814492091536522, 0.021236371248960495, 0.016983162611722946, 0.012233165092766285, 0.007265277672559023, 0.0018193587893620133, -0.003508041612803936, -0.00882625300437212, -0.014388861134648323, -0.018889402970671654, -0.023044876754283905, -0.026687253266572952, -0.02909351885318756, -0.03121851198375225, -0.03218904137611389, -0.03236770257353783, -0.03190368413925171, -0.029457665979862213, -0.026688754558563232, -0.02298724092543125, -0.01893911138176918, -0.015097685158252716, -0.00955017376691103, -0.004187385551631451, 0.0011388337006792426, 0.00751644978299737, 0.012857751920819283, 0.017964288592338562, 0.022509684786200523, 0.02638588845729828, 0.029920417815446854, 0.03204575181007385, 0.03357600048184395, 0.0343010276556015, 0.03340873494744301, 0.03237758204340935, 0.030133619904518127, 0.026951653882861137, 0.023154720664024353, 0.017946505919098854, 0.013164496049284935, 0.008183708414435387, 0.0022288449108600616, -0.0035704486072063446, -0.009121562354266644, -0.014129560440778732, -0.019068865105509758, -0.023429445922374725, -0.02701079286634922, -0.03040221892297268, -0.03227220103144646, -0.03347000107169151, -0.03435828164219856, -0.03319110348820686, -0.03173227608203888, -0.029578257352113724, -0.02583739161491394, -0.021713322028517723, -0.017238831147551537, -0.012491356581449509, -0.006802062038332224, -0.0016472279094159603, 0.004226053599268198, 0.010717732831835747, 0.015780629590153694, 0.02110246941447258, 0.024985050782561302, 0.02854149043560028, 0.03172504901885986, 0.033568140119314194, 0.035197850316762924, 0.03493168577551842, 0.03337761387228966, 0.03178746625781059, 0.02886640653014183, 0.025556428357958794, 0.021260861307382584, 0.015520714223384857, 0.010401478968560696, 0.004484128672629595, -0.0024417759850621223, -0.008790522813796997, -0.014739065431058407, -0.020641911774873734, -0.026192953810095787, -0.030847150832414627, -0.034811437129974365, -0.03745946288108826, -0.03916354849934578, -0.03984268009662628, -0.03940491005778313, -0.03755543753504753, -0.03435198962688446, -0.03060333803296089, -0.025403572246432304, -0.019802451133728027, -0.013768509961664677, -0.006832989398390055, -0.00046374835073947906, 0.006726330611854792, 0.013499458320438862, 0.020173626020550728, 0.026754025369882584, 0.03157644718885422, 0.03585680574178696, 0.03871380165219307, 0.04021002724766731, 0.04135004058480263, 0.04071395844221115, 0.039455533027648926, 0.03691234067082405, 0.03258278965950012, 0.027516251429915428, 0.021729230880737305, 0.015116808004677296, 0.008175031282007694, 0.001048517762683332, -0.006369763985276222, -0.013054974377155304, -0.020053356885910034, -0.026726868003606796, -0.03142930567264557, -0.03614504262804985, -0.04014003276824951, -0.0427006371319294, -0.043281275779008865, -0.04232087731361389, -0.04138907790184021, -0.03861401230096817, -0.034118056297302246, -0.029640449211001396, -0.023501133546233177, -0.017002509906888008, -0.010424388572573662, -0.0026176832616329193, 0.005052162799984217, 0.012508256360888481, 0.01970582641661167, 0.02609272114932537, 0.03191901743412018, 0.03691379725933075, 0.04154019057750702, 0.04437539726495743, 0.04528554901480675, 0.04518759623169899, 0.043256767094135284, 0.04108107089996338, 0.036942292004823685, 0.03139107674360275, 0.02606283314526081, 0.018625235185027122, 0.011014395393431187, 0.0026048191357403994, -0.006027529947459698, -0.013633472844958305, -0.02167157270014286, -0.028222352266311646, -0.034537769854068756, -0.04018966853618622, -0.043822649866342545, -0.047217171639204025, -0.04854884371161461, -0.04842335730791092, -0.04672342538833618, -0.04313227906823158, -0.03931451588869095, -0.03397789224982262, -0.027769409120082855, -0.020938528701663017, -0.012419457547366619, -0.0039778538048267365, 0.004251215141266584, 0.01259999442845583, 0.020390009507536888, 0.02696533314883709, 0.03292911499738693, 0.03847651183605194, 0.04320136457681656, 0.04600878432393074, 0.04736456274986267, 0.04688788205385208, 0.04433291032910347, 0.04170563817024231, 0.03787624090909958, 0.03311160206794739, 0.027092279866337776, 0.019857805222272873, 0.012650982476770878, 0.004018981475383043, -0.00381389819085598, -0.01090286672115326, -0.018754826858639717, -0.025179117918014526, -0.031070567667484283, -0.03669372946023941, -0.040865808725357056, -0.04403649643063545, -0.04570244625210762, -0.04557941108942032, -0.04451289400458336, -0.04168827831745148, -0.03848430514335632, -0.0339750200510025, -0.027906646952033043, -0.021440813317894936, -0.013714926317334175, -0.005435271188616753, 0.0027386534493416548, 0.010553772561252117, 0.017936542630195618, 0.025240764021873474, 0.03221854940056801, 0.0379314087331295, 0.042541492730379105, 0.04647155478596687, 0.048465754836797714, 0.0491713248193264, 0.048500921577215195, 0.04632198438048363, 0.043457966297864914, 0.03917102888226509, 0.034070223569869995, 0.02762916125357151, 0.01972787268459797, 0.011668836697936058, 0.0037464636843651533, -0.0043832105584442616, -0.012732095085084438, -0.019715476781129837, -0.02657543681561947, -0.0331302136182785, -0.03818046674132347, -0.04247090592980385, -0.04526875168085098, -0.046678535640239716, -0.046262819319963455, -0.04469805210828781, -0.042018450796604156, -0.03801823779940605, -0.03258473426103592, -0.026225917041301727, -0.01965033821761608, -0.011360658332705498, -0.003037126734852791, 0.004406694322824478, 0.012347790412604809, 0.019835669547319412, 0.02690093219280243, 0.03361921012401581, 0.039567627012729645, 0.04388534650206566, 0.04703275486826897, 0.04860004782676697, 0.04839242249727249, 0.04753253236413002, 0.04532735422253609, 0.04161320999264717, 0.0374007411301136, 0.03118279203772545, 0.023884367197752, 0.016995714977383614, 0.008397691883146763, -0.00019265618175268173, -0.007889539003372192, -0.016458112746477127, -0.023782115429639816, -0.03127312660217285, -0.03767479956150055, -0.042594075202941895, -0.047251034528017044, -0.04958160221576691, -0.05122390016913414, -0.05162917077541351, -0.049649424850940704, -0.04717151075601578, -0.042580194771289825, -0.03687569499015808, -0.03022485226392746, -0.021761752665042877, -0.01411992497742176, -0.005694707855582237, 0.0033245962113142014, 0.012228327803313732, 0.021406633779406548, 0.029451588168740273, 0.03659359738230705, 0.042758792638778687, 0.04802374914288521, 0.05171263590455055, 0.05351952463388443, 0.0538877509534359, 0.05274701118469238, 0.04986521974205971, 0.046047113835811615, 0.040925364941358566, 0.034231074154376984, 0.026277510449290276, 0.01734217256307602, 0.007802962325513363, -0.0013267984613776207, -0.010653140023350716, -0.01972540095448494, -0.028002547100186348, -0.0364869125187397, -0.043650053441524506, -0.04897189140319824, -0.0530049167573452, -0.055814217776060104, -0.05732429027557373, -0.05718901380896568, -0.05499625951051712, -0.050577934831380844, -0.04446696490049362, -0.0378444567322731, -0.02951296791434288, -0.02004283107817173, -0.010791727341711521, -0.00009985826909542084, 0.010243978351354599, 0.020088806748390198, 0.02968454360961914, 0.037860795855522156, 0.04551873728632927, 0.05183699354529381, 0.05702415108680725, 0.06029411405324936, 0.061263516545295715, 0.06150675565004349, 0.05903192237019539, 0.05409454554319382, 0.0487624928355217, 0.041926246136426926, 0.033668190240859985, 0.024686504155397415, 0.014385462738573551, 0.0034301173873245716, -0.007654368877410889, -0.018750876188278198, -0.02885013446211815, -0.03846099227666855, -0.04642156884074211, -0.05308099836111069, -0.059072524309158325, -0.06272536516189575, -0.06457453966140747, -0.06454411894083023, -0.06237739697098732, -0.05843234062194824, -0.05267985537648201, -0.04559803009033203, -0.03690518066287041, -0.027316130697727203, -0.016485795378684998, -0.005088672041893005, 0.005812300834804773, 0.017174405977129936, 0.027563007548451424, 0.03684748709201813, 0.04534861072897911, 0.05223546177148819, 0.057793062180280685, 0.062129903584718704, 0.06457600742578506, 0.06458166986703873, 0.06250014901161194, 0.05794680118560791, 0.05213796719908714, 0.044855669140815735, 0.03598855808377266, 0.026626132428646088, 0.015961898490786552, 0.004825672134757042, -0.006542418152093887, -0.01860753260552883, -0.029787257313728333, -0.03959285095334053, -0.04803266376256943, -0.05545184388756752, -0.061663657426834106, -0.06553799659013748, -0.0681663304567337, -0.06870530545711517, -0.06669489294290543, -0.06292799115180969, -0.05709919333457947, -0.04989124462008476, -0.041075848042964935, -0.030940985307097435, -0.02051655948162079, -0.008670888841152191, 0.0032623736187815666, 0.015001572668552399, 0.02620246633887291, 0.036401767283678055, 0.0451413057744503, 0.05255777761340141, 0.058903638273477554, 0.06389234215021133, 0.06679824739694595, 0.06649406999349594, 0.06457160413265228, 0.061521753668785095, 0.056357864290475845, 0.04900524765253067, 0.04037143290042877, 0.030973760411143303, 0.020573286339640617, 0.009619658812880516, -0.001749727874994278, -0.013098469004034996, -0.02447512000799179, -0.034815214574337006, -0.04382292553782463, -0.05136803537607193, -0.05764896050095558, -0.06288710236549377, -0.06539833545684814, -0.06632443517446518, -0.06576049327850342, -0.06200521066784859, -0.05747132748365402, -0.05063214525580406, -0.04182913526892662, -0.033079542219638824, -0.0231529101729393, -0.012719715014100075, -0.0015483759343624115, 0.01032876968383789, 0.020969396457076073, 0.03176254779100418, 0.0415019765496254, 0.04940555617213249, 0.05631367117166519, 0.06137726455926895, 0.06487710773944855, 0.06671193987131119, 0.06676831096410751, 0.06501013785600662, 0.06110219284892082, 0.055063646286726, 0.04764293134212494, 0.0394127331674099, 0.029361870139837265, 0.01866650953888893, 0.007638531271368265, -0.004223078489303589, -0.014937124215066433, -0.025896361097693443, -0.03626837581396103, -0.0448220893740654, -0.0528547540307045, -0.05888310819864273, -0.06328560411930084, -0.06644357740879059, -0.06691906601190567, -0.06639689952135086, -0.06372939795255661, -0.058441195636987686, -0.052917927503585815, -0.044511809945106506, -0.034486450254917145, -0.02432733215391636, -0.012494809925556183, -0.0008229706436395645, 0.010620180517435074, 0.021996591240167618, 0.03256372734904289, 0.042041994631290436, 0.05065842717885971, 0.058322686702013016, 0.06424666196107864, 0.06819364428520203, 0.06973889470100403, 0.0690612643957138, 0.0667567178606987, 0.06252431869506836, 0.05640554055571556, 0.04863109067082405, 0.039581432938575745, 0.029267720878124237, 0.017780747264623642, 0.00530548021197319, -0.006560042500495911, -0.018712161108851433, -0.030149070546030998, -0.04085344821214676, -0.05089154839515686, -0.05860079452395439, -0.06596310436725616, -0.07099853456020355, -0.07373183965682983, -0.07390341907739639, -0.0715569257736206, -0.06801003962755203, -0.06226658821105957, -0.05499084293842316, -0.045908428728580475, -0.035257741808891296, -0.023773271590471268, -0.011390537023544312, 0.0015278086066246033, 0.015012072399258614, 0.027444224804639816, 0.039158206433057785, 0.05052586644887924, 0.05949496477842331, 0.06739061325788498, 0.07297223061323166, 0.07624940574169159, 0.07831265777349472, 0.0768011137843132, 0.07372184097766876, 0.06934196501970291, 0.06134399399161339, 0.05213936045765877, 0.041161540895700455, 0.029012691229581833, 0.015934256836771965, 0.0019706902094185352, -0.011687785387039185, -0.025747673586010933, -0.03833545744419098, -0.04935965687036514, -0.060292020440101624, -0.06827665865421295, -0.07477889209985733, -0.07987484335899353, -0.08144338428974152, -0.08112464845180511, -0.07879625260829926, -0.07309262454509735, -0.06563564389944077, -0.05608223378658295, -0.044670529663562775, -0.03191562369465828, -0.01835768297314644, -0.004060976207256317, 0.010457738302648067, 0.024311576038599014, 0.03843437135219574, 0.050972603261470795, 0.06122466176748276, 0.0703849270939827, 0.07755240797996521, 0.08244933933019638, 0.08517656475305557, 0.08517170697450638, 0.08155197650194168, 0.07670626044273376, 0.06952522695064545, 0.05938072130084038, 0.04841379448771477, 0.03515748307108879, 0.021245107054710388, 0.0073131355457007885, -0.007984070107340813, -0.022576335817575455, -0.03648078814148903, -0.049595870077610016, -0.06068217009305954, -0.07002029567956924, -0.07780365645885468, -0.08308149129152298, -0.0862150639295578, -0.0865330621600151, -0.08367940783500671, -0.07894372195005417, -0.07173331826925278, -0.06265366077423096, -0.051483143121004105, -0.038671866059303284, -0.02544739656150341, -0.010750634595751762, 0.004507321398705244, 0.018909325823187828, 0.03344656527042389, 0.04646049812436104, 0.05694200471043587, 0.06669212877750397, 0.07490760833024979, 0.07976993918418884, 0.08324173837900162, 0.08413828164339066, 0.08201479911804199, 0.07821071147918701, 0.07144669443368912, 0.06242699548602104, 0.0521736815571785, 0.03974698483943939, 0.0263894684612751, 0.012652183882892132, -0.00233282707631588, -0.016623321920633316, -0.03074544481933117, -0.04477955028414726, -0.056752871721982956, -0.06801377236843109, -0.07649006694555283, -0.08271957188844681, -0.08689577877521515, -0.08803339302539825, -0.08746606111526489, -0.08403700590133667, -0.07823795825242996, -0.06949621438980103, -0.05941169708967209, -0.04790594428777695, -0.033660903573036194, -0.01997482404112816, -0.005233721807599068, 0.01001730002462864, 0.023394206538796425, 0.036951370537281036, 0.049482811242341995, 0.061118897050619125, 0.0710456371307373, 0.07737259566783905, 0.08245020359754562, 0.08422762900590897, 0.08358645439147949, 0.08186770975589752, 0.07685495167970657, 0.07033609598875046, 0.06082611903548241, 0.04889165982604027, 0.036170873790979385, 0.021992277354002, 0.008319198153913021, -0.006193650886416435, -0.020933108404278755, -0.03411275893449783, -0.047585710883140564, -0.05910108983516693, -0.06864066421985626, -0.077667236328125, -0.08306446671485901, -0.08610211312770844, -0.087188221514225, -0.08499406278133392, -0.08174315094947815, -0.07570581883192062, -0.06665030866861343, -0.05606791377067566, -0.04399678856134415, -0.03101435862481594, -0.016580574214458466, -0.0016555637121200562, 0.013162502087652683, 0.02792765013873577, 0.041305623948574066, 0.05434366688132286, 0.06526931375265121, 0.07402334362268448, 0.08229290693998337, 0.08711118996143341, 0.08877071738243103, 0.08835740387439728, 0.08494886755943298, 0.07990781962871552, 0.07229521125555038, 0.06204822659492493, 0.051535263657569885, 0.038587819784879684, 0.024094393476843834, 0.009823345579206944, -0.005717156454920769, -0.02103091962635517, -0.03559859097003937, -0.04965657368302345, -0.06195786967873573, -0.07296956330537796, -0.08206045627593994, -0.08811870962381363, -0.09094612300395966, -0.09197734296321869, -0.09001760929822922, -0.08616805076599121, -0.07926328480243683, -0.06901031732559204, -0.05829212814569473, -0.04481852799654007, -0.03013039007782936, -0.015087337233126163, 0.001655888045206666, 0.01763186790049076, 0.03348531946539879, 0.04803524538874626, 0.060465555638074875, 0.07226688414812088, 0.08163931965827942, 0.08837686479091644, 0.0927020013332367, 0.09461581707000732, 0.09444756805896759, 0.09104301035404205, 0.08381616324186325, 0.07532808184623718, 0.06445964425802231, 0.051100071519613266, 0.0368613675236702, 0.020970826968550682, 0.004255402367562056, -0.012000586837530136, -0.028482535853981972, -0.04423652961850166, -0.05808970332145691, -0.07093916088342667, -0.08204442262649536, -0.09097633510828018, -0.09723030030727386, -0.09920728951692581, -0.0995023176074028, -0.09590340405702591, -0.08798982948064804, -0.07985725998878479, -0.0686388909816742, -0.055097922682762146, -0.040462035685777664, -0.02416759543120861, -0.0070433057844638824, 0.01079527661204338, 0.028044531121850014, 0.044283587485551834, 0.05960121005773544, 0.07246119529008865, 0.08329415321350098, 0.0921018198132515, 0.09820442646741867, 0.10112050175666809, 0.10099996626377106, 0.09832682460546494, 0.09181194752454758, 0.08327730745077133, 0.07289717346429825, 0.05953424051403999, 0.04474181681871414, 0.028612526133656502, 0.012120642699301243, -0.005245659500360489, -0.02348201349377632, -0.04005078971385956, -0.05565810203552246, -0.06925500929355621, -0.0808156207203865, -0.09037981182336807, -0.09716686606407166, -0.10125517845153809, -0.1021663248538971, -0.10046154260635376, -0.0947776809334755, -0.08596386015415192, -0.07491527497768402, -0.06126582249999046, -0.047289252281188965, -0.031129328534007072, -0.013262271881103516, 0.004245377145707607, 0.022542491555213928, 0.04013613238930702, 0.05582654848694801, 0.06934623420238495, 0.08165723085403442, 0.09146987646818161, 0.09785228222608566, 0.10195095837116241, 0.10339874029159546, 0.1020311713218689, 0.09693185985088348, 0.08926376700401306, 0.0793333351612091, 0.06659296900033951, 0.05254984647035599, 0.0367167629301548, 0.019785642623901367, 0.0026966112200170755, -0.014600304886698723, -0.03233127295970917, -0.048854194581508636, -0.06358879804611206, -0.0774831622838974, -0.08751791715621948, -0.09499382227659225, -0.10081535577774048, -0.10331931710243225, -0.10317102819681168, -0.09885462373495102, -0.091896653175354, -0.08267879486083984, -0.06969387829303741, -0.05520396679639816, -0.03914637491106987, -0.021747028455138206, -0.004506353288888931, 0.012958756648004055, 0.03105836547911167, 0.04826044663786888, 0.06367748230695724, 0.07702876627445221, 0.08790579438209534, 0.09610883891582489, 0.10178438574075699, 0.10492369532585144, 0.10441053658723831, 0.10129989683628082, 0.09513503313064575, 0.08598369359970093, 0.07485240697860718, 0.06074114516377449, 0.04617027938365936, 0.02990187332034111, 0.012059993110597134, -0.0052250344306230545, -0.02414112724363804, -0.04100901633501053, -0.056167393922805786, -0.0714941918849945, -0.08363831043243408, -0.09325552731752396, -0.10074718296527863, -0.10495232045650482, -0.1060602068901062, -0.10396184027194977, -0.09867115318775177, -0.09059293568134308, -0.07865400612354279, -0.06536345928907394, -0.0505979023873806, -0.03362545743584633, -0.015997540205717087, 0.0021171870175749063, 0.020470572635531425, 0.03771888092160225, 0.054058246314525604, 0.06894230097532272, 0.08135084062814713, 0.09210915863513947, 0.09993141144514084, 0.10457712411880493, 0.10679750144481659, 0.10495571792125702, 0.10160033404827118, 0.09514822065830231, 0.08401021361351013, 0.07187958061695099, 0.057262491434812546, 0.04127134382724762, 0.023648126050829887, 0.004575363360345364, -0.013978373259305954, -0.03304893150925636, -0.050852835178375244, -0.06764373183250427, -0.08274818956851959, -0.09468180686235428, -0.10470588505268097, -0.11148820072412491, -0.11472981423139572, -0.11516997218132019, -0.1111987978219986, -0.10373606532812119, -0.0932609811425209, -0.07964235544204712, -0.06370885670185089, -0.046110909432172775, -0.02788129262626171, -0.009683452546596527, 0.009989743120968342, 0.03005128912627697, 0.04829543083906174, 0.06532976031303406, 0.08032131940126419, 0.09222625941038132, 0.10265380144119263, 0.10945948958396912, 0.11267748475074768, 0.11367830634117126, 0.11012248694896698, 0.10366266965866089, 0.09451915323734283, 0.08172305673360825, 0.0672360360622406, 0.05064566060900688, 0.03242858126759529, 0.013009477406740189, -0.007264826446771622, -0.027366135269403458, -0.047518324106931686, -0.06546342372894287, -0.08157944679260254, -0.09567824006080627, -0.1062949076294899, -0.11425819993019104, -0.11836838722229004, -0.11988259851932526]);

    it('should calculate frequency from raw data', () => {
        expect(TimeDomainDataAnalyser.getFrequencyFromTimeDomainData(dataArray, sampleRate)).toBe(1298.8684970901368);
    });
});