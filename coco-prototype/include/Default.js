$(function () {
    $.fn.extend({
        exHide: function () {
            return this.hide().addClass("hidden");
        },
        exShow: function () {
            return this.show().removeClass("hidden");
        }
    });

    // ライブラリ
    var Lib = {
        getProperty: function (itemArray) {
            return {
                id:         itemArray[0],
                name:       itemArray[1],
                section:    itemArray[2],
                statusCd:   itemArray[3],
                jotai:      itemArray[4],
                yukisaki:   itemArray[5],
                nichiji:    itemArray[6],
                imgTag:     itemArray[7],
                kana:       itemArray[9],
                phone:      itemArray[10],
                sectionCd:  itemArray[12],
                rank:       itemArray[13]
            }
        },
        createButton: function (text) {
            return $("<a></a>").addClass("button").text(text);
        },
        createTextBox: function (val, placeholder, id) {
            var input = $("<input />").attr("id", id).addClass("editInput").attr("placeholder", placeholder).val(val).ahPlaceholder({
                placeholderColor : "silver",
                placeholderAttr : "placeholder",
                likeApple : false
            })
            .on("change", function () {
                if(input.val().length > 0) btn.exShow();
                else btn.exHide();
            })
            .on("keyup", function () {
                if(input.val().length > 0) btn.exShow();
                else btn.exHide();
            });
            var btn = $("<div></div>").addClass("delval").on("click", function () {
                input.val("").change();
                btn.exHide();
                input.focus();
            });
            if(input.val().length < 1) btn.exHide();

            return $("<div></div>").addClass("exInputBox").append(input).append(btn);
        },
        getTime: function () {
            var d = new Date();
            // 年月日・曜日・時分秒の取得
            var month = d.getMonth() + 1;
            var day = d.getDate();
            var hour = d.getHours();
            var minute = d.getMinutes();
            var second = d.getSeconds();

            // 1桁を2桁に変換する
            if (month < 10) { month = "0" + month; }
            if (day < 10) { day = "0" + day; }
            if (hour < 10) { hour = "0" + hour; }
            if (minute < 10) { minute = "0" + minute; }
            if (second < 10) { second = "0" + second; }

            return d.getFullYear() + "/" + month + "/" + day + "　" + hour + ":" + minute + ":" + second;
        }
    }

    // リストアイテム
    var ListItem = {
        _add: function (itemArray) {
            var item = Lib.getProperty(itemArray);
            var li = $("<li></li>").addClass("theme" + item.statusCd)
            .append($("<div></div>").addClass("block-a")
                .append($("<div></div>").addClass("block-a-1").html(item.imgTag))
            )
            .append($("<div></div>").addClass("block-b")
                .append($("<div></div>").addClass("block-b-1 textdata").text(item.id))
            )
            .append($("<div></div>").addClass("block-c")
                .append($("<div></div>").addClass("block-c-1 textdata").text(item.name))
                .append($("<div></div>").addClass("block-c-2 textdata").text(item.kana))
            )
            .append($("<div></div>").addClass("block-d")
                .append($("<div></div>").addClass("block-d-1 textdata").text(item.section))
                .append($("<div></div>").addClass("block-d-2 textdata").text(item.rank))
            )
            .append($("<div></div>").addClass("block-o")
                .append($("<div></div>").addClass("block-o-1").attr("data-id", item.id)
                    .append(Lib.createButton(
                        item.statusCd == "1" ? "社内" :
                        item.statusCd == "2" ? "社外" :
                        item.statusCd == "3" ? "休暇" : "帰宅"
                    ))
                )
            )
            .append($("<div></div>").addClass("block-p")
                .append($("<div></div>").addClass("block-p-1 textdata").text(item.jotai))
                .append($("<div></div>").addClass("block-p-2 textdata").text(item.yukisaki))
                .append($("<div></div>").addClass("block-p-3 textdata").text(item.nichiji))
            );

            return li;
        },

        _edit2: function (li, id, name, statusCd, jotai, yukisaki, nichiji) {

            var editer = $("<li></li>").addClass("theme" + statusCd)
                .append($("<div></div>").addClass("block-y")
                    .append($("<div></div>").addClass("block-be")
                        .append($("<div></div>").addClass("block-be-1")
                            .append(Lib.createButton("社内").addClass(statusCd == "1" ? "on" : "").attr("data-clicktype", "selectStatus").attr("data-statusCd", "1"))
                            .append(Lib.createButton("社外").addClass(statusCd == "2" ? "on" : "").attr("data-clicktype", "selectStatus").attr("data-statusCd", "2"))
                            .append(Lib.createButton("休暇").addClass(statusCd == "3" ? "on" : "").attr("data-clicktype", "selectStatus").attr("data-statusCd", "3"))
                            .append(Lib.createButton("帰宅").addClass(statusCd == "4" ? "on" : "").attr("data-clicktype", "selectStatus").attr("data-statusCd", "4"))
                        )
                        .append($("<div></div>").addClass("block-be-1")
                            .append($("<div></div>").addClass("editInputTitle").text("状態："))
                            .append(j)
                            .append(Lib.createButton("選択").addClass("editSelectButton").on("click", function (e) {
                                Manager.PopupJotai.open(function (v) { j.val(v); });
                                return false;
                            }))
                        )
                        .append($("<div></div>").addClass("block-be-1")
                            .append($("<div></div>").addClass("editInputTitle").text("行先："))
                            .append(y)
                            .append(Lib.createButton("選択").addClass("editSelectButton").on("click", function (e) {
                                Manager.PopupYukisaki.open(function (v) { y.val(v); });
                                return false;
                            }))
                        )
                        .append($("<div></div>").addClass("block-be-1")
                            .append($("<div></div>").addClass("editInputTitle").text("日時："))
                            .append(n)
                            .append(Lib.createButton("選択").addClass("editSelectButton").on("click", function (e) {
                                Manager.PopupNichiji.open(function (v) { n.val(v); });
                                return false;
                            }))
                        )
                    )
                    .append($("<div></div>").addClass("block-ce")
                        .append(Lib.createButton("Cancel").addClass("editButton"))
                        .append(Lib.createButton("Clear").addClass("editButton").on("click", function (e) {
                            j.val("");
                            y.val("");
                            n.val("");
                            Manager.PopupNichiji.clear();
                            return false;
                        }))
                        .append(Lib.createButton("Update").addClass("editButton"))
                    )
                )
                ;


        },

        _edit: function (target_li, item) {
            var newStatusCd = item.statusCd;

            // マネージャーに登録
            Manager.startEdit(function () {
                target_li.find(".block-s").remove();
                target_li.find(".block-o, .block-p").exShow();
            });

            // 元の要素を非表示
            target_li.find(".block-o, .block-p").exHide();

            // 編集用要素を追加
            target_li.append($("<div></div>").addClass("block-s")
                .append($("<div></div>").addClass("block-s-1")
                    .append(Lib.createButton("社内").addClass(item.statusCd == "1" ? "on" : "").addClass("selectStatus").attr("data-statusCd", "1"))
                    .append(Lib.createButton("社外").addClass(item.statusCd == "2" ? "on" : "").addClass("selectStatus").attr("data-statusCd", "2"))
                    .append(Lib.createButton("休暇").addClass(item.statusCd == "3" ? "on" : "").addClass("selectStatus").attr("data-statusCd", "3"))
                    .append(Lib.createButton("帰宅").addClass(item.statusCd == "4" ? "on" : "").addClass("selectStatus").attr("data-statusCd", "4"))
                )
                .append($("<div></div>").addClass("block-s-2")
                    .append(Lib.createTextBox(item.jotai, "例：会議、出張など"))
                    //.append(Lib.createButton("選択"))
                )
                .append($("<div></div>").addClass("block-s-3")
                    .append(Lib.createTextBox(item.yukisaki, "例：○○会議室、△△市など"))
                    //.append(Lib.createButton("選択"))
                )
                .append($("<div></div>").addClass("block-s-4")
                    .append(Lib.createTextBox(item.nichiji, "例：～10:00、NRなど"))
                    //.append(Lib.createButton("選択"))
                )
                .append($("<div></div>").addClass("block-s-5")
                    .append(Lib.createButton("取消").addClass("cancel").on("click", function (e) {
                        Manager.cancelEdit();
                        Manager.PopupNichiji.clear();
                    }))
                    .append(Lib.createButton("更新").addClass("update").on("click", function (e) {
                        var j = target_li.find("block-s-2 input");
                        var y = target_li.find("block-s-3 input");
                        var n = target_li.find("block-s-4 input");
                        Manager.setStatus(item.id, newStatusCd, j.val(), y.val(), n.val());
                        Manager.update();
                        Manager.PopupNichiji.clear();
                        return false;
                    }))
                )
            )
            .on("click", "a.button.selectStatus", function (e) {
                var t = $(this);
                t.siblings().removeClass("on");
                t.addClass("on");
                newStatusCd = t.attr("data-statusCd");
            });

            // 日時クリア
            Manager.PopupNichiji.clear();
        },

        init: function () {
            var self = this;
            var id = "";
            var btnSize = { x: 46, y: 32 }
            var copy_item = null;
            var target_li = null;

            var temp = [];
            var cancel = function () {
                while (temp.length > 0) {
                    temp.pop()();
                }
            }
            var open = function () {
                var b = updateStatusBox.find("a.button");
                b.eq(0).stop(true).animate({
                    "margin-left": (2 + btnSize.x) + "px"
                }, "fast");
                b.eq(1).stop(true).animate({
                    "margin-left": (2 + btnSize.x * 2) + "px"
                }, "fast");
                b.eq(2).stop(true).animate({
                    "margin-left": "2px",
                    "margin-top": (2 + btnSize.y) + "px"
                }, "fast");
                b.eq(3).stop(true).animate({
                    "margin-left": (2 + btnSize.x) + "px",
                    "margin-top": (2 + btnSize.y) + "px"
                }, "fast");
                b.eq(4).stop(true).animate({
                    "margin-left": (2 + btnSize.x * 2) + "px",
                    "margin-top": (2 + btnSize.y) + "px"
                }, "fast");
            }
            var close = function () {
                var b = updateStatusBox.find("a.button");
                var s = {
                    "margin-left": "2px",
                    "margin-top": "2px"
                }
                b.eq(0).animate(s, "fast");
                b.eq(1).animate(s, "fast");
                b.eq(2).animate(s, "fast");
                b.eq(3).animate(s, "fast");
                b.eq(4).animate(s, {
                    duration: "fast",
                    complete: function () {
                        updateStatusBox.exHide();
                        cancel();
                    }
                });
            }

            var updateStatusBox = $("#UpdateStatusBox").exHide()
                .append(Lib.createButton("社内").addClass("updateDirect").attr("data-statusCd", "1"))
                .append(Lib.createButton("帰宅").addClass("updateDirect").attr("data-statusCd", "4"))
                .append(Lib.createButton("編集").addClass("edit"))
                .append(Lib.createButton("Copy").addClass("copy"))
                .append(Lib.createButton("Paste").addClass("paste hidden"))
                .append($("<div></div>").addClass("anti-hover"))
            .on("click", "a.button.updateDirect", function () {
                Manager.updateDirect(id, $(this).attr("data-statusCd"));
            })
            .on("click", "a.button.edit", function () {
                $.each(Manager.List, function (i, s) {
                    var item = Lib.getProperty(s);
                    if (item.id == id) {
                        updateStatusBox.exHide();
                        close();
                        self._edit(target_li, item);
                        return false;
                    }
                });
            })
            .on("click", "a.button.copy", function () {
                $.each(Manager.List, function (i, s) {
                    var item = Lib.getProperty(s);
                    if (item.id == id) {
                        //Manager.setStatus(item.id, item.statusCd, item.jotai, item.yukisaki, item.nichiji);
                        copy_item = item;
                        updateStatusBox.find("a.button.paste").exShow();
                        alert(item.name + "(" + item.id + ") の内容をコピーしました。\n[Paste] ボタンで貼り付けます。");
                        return false;
                    }
                });
            })
            .on("click", "a.button.paste", function () {
                updateStatusBox.exHide();
                close();
                self._edit(target_li, copy_item);
            })
            .hover(open, close);
            $("#MainPanel").append(updateStatusBox);

            $("#ListPanel").on("click", ".more", function () {
                self._appendListDom();
            })
            .on("mouseover", "li .block-o .block-o-1", function () {
                var t = $(this);
                var o = t.offset();
                // 更新用の参照
                id = t.attr("data-id");
                target_li = t.parent().parent();

                updateStatusBox.exShow().css({
                    "left": (o.left) + "px",
                    "top": (o.top) + "px"
                });
                open();
                cancel();
                t.parent().next().stop(true).animate({ "margin-left": (528 + btnSize.x * 2) + "px" }, "fast");
                temp.push(function () {
                    t.parent().next().animate({ "margin-left": "528px" }, "fast");
                });
            });
        },

        Reselect: function (selectFunc) {
            if (selectFunc) {
                this._selectFunc = selectFunc;
            }

            // 編集キャンセル
            Manager.cancelEdit();

            this._selectedList = this._selectFunc();

            // リストの初期化
            this._empty();
            // リストに要素追加
            this._appendListDom();

            // パネルの表示
            $("[data-panelType=mainContents]").exHide();
            $("#ListPanel").exShow();

            // オプション
            $.each(Manager.option.exReselect, function (i, scr) {
                scr();
            });
        },
        _selectFunc: function () { return []; },
        _selectedList: [],
        _appendListDom: function () {
            var m = $("#ListPanel .more");
            for (var i = 0; i < 10; i++) {
                if (this._selectedList.length > 0) {
                    var s = this._selectedList.shift();
                    m.before(this._add(s));
                }
            }
            if (this._selectedList.length == 0) {
                m.exHide();
            }
        },
        _empty: function () {
            var panel = $("#ListPanel");
            panel.empty("");
            panel.append($("<div></div>").addClass("more")
                .append($("<div></div>").addClass("icon"))
            );
        }
    }

    // 更新時刻
    var UpdateTime = {
        init: function () {
            $("#LastUpdate").on("click", function () {
                Manager.reload();
            });
            // this.refreshTime();
        },
        waiting: function () {
            $("#LastUpdate").addClass("waiting");
        },
        refreshTime: function () {
            $("#LastUpdate").removeClass("waiting");
            $("#LastUpdateTime").text(Lib.getTime());
        }
    }

    // 検索
    var Search = {
        createSection: function () {
            var ul = $("#SelectSectionList");

            ul.append($("<li></li>").text("デフォルト").attr("data-sectionType", "myList").attr("data-selected", "false"));
            $.each(Manager.SectionList, function (i, s) {
                ul.append($("<li></li>").text(s[0]).attr("data-sectionType", "normal").attr("data-selected", "false").attr("data-sectionValue", s[1]));
            });
            ul.append($("<li></li>").attr("data-sectionType", "last").addClass("openBtn")
                .append($("<div></div>").addClass("icon"))
            );
            ul.append($("<li></li>").attr("data-sectionType", "last").addClass("closeBtn")
                .append($("<div></div>").addClass("icon"))
            );

            this.resetSection();
            $("#SelectSectionList li:not(.hidden)").first().trigger("click");
        },

        resetSection: function () {
            $("#SelectSectionList li").exHide();
            if (Manager.option.myList.length > 0) {
                $("#SelectSectionList li[data-sectionType=myList]").exShow();
                // ホームボタン
                $("#HomeIcon").exShow();
            } else {
                // ホームボタン
                $("#HomeIcon").exHide();
            }
            if (Manager.option.mySection.length > 0) {
                $("#SelectSectionList li[data-sectionType=normal]").each(function (i, t) {
                    var s = $(t);
                    if ($.inArray(s.text(), Manager.option.mySection) > -1) {
                        s.exShow();
                    }
                });
                $("#SelectSectionList li.openBtn[data-sectionType=last]").exShow();
            } else {
                $("#SelectSectionList li[data-sectionType=normal]").exShow();
            }
        },

        _changeSection: function () {
            var li = $("#SelectSectionList li[data-selected=true]");
            var newSection = li.text();
            Search.setKeyword(newSection, false);

            switch (li.attr("data-sectionType")) {
                case "myList":
                    ListItem.Reselect(function () {
                        return $.map(Manager.option.myList, function (id, j) {
                            var a = [];
                            $.each(Manager.List, function (i, s) {
                                var item = Lib.getProperty(s);
                                if (item.id == id) {
                                    a.push(s);
                                    return false;
                                }
                            });
                            return a;
                        });
                    });
                    break;
                case "normal":
                    var v = li.attr("data-sectionValue");
                    ListItem.Reselect(function () {
                        return $.map(Manager.List, function (s, i) {
                            var item = Lib.getProperty(s);
                            if (item.section == v) {
                                return [s];
                            }
                        });
                    });
                    break;
                default:
            }
        },

        init: function () {
            var self = this;
            var ul = $("#SelectSectionList");

            var openList = function () {
                ul.exShow();
                ul.stop(true).animate({ "height": "320px" }, {
                    duration: "fast",
                    complete: function () {
                        ul.css("overflow-y", "auto");
                    }
                });
            }
            var closeList = function () {
                ul.animate({ "height": "0px" }, {
                    duration: "fast",
                    complete: function () {
                        ul.exHide();
                    }
                });
                // よく使う部署の初期化
                self.resetSection();
            }
            ul.on("click", "li[data-sectionType=myList],li[data-sectionType=normal]", function (e) {
                $("#SelectSectionList li[data-selected=true]").attr("data-selected", "false");
                $(e.target).attr("data-selected", "true");
                self._changeSection();
                closeList();
                return false;
            })
            .on("click", "li.openBtn[data-sectionType=last]", function (e) {
                $("#SelectSectionList li[data-sectionType=normal]").exShow();
                $("#SelectSectionList li.openBtn[data-sectionType=last]").exHide();
                $("#SelectSectionList li.closeBtn[data-sectionType=last]").exShow();
                return false;
            })
            .on("click", "li.closeBtn[data-sectionType=last]", function (e) {
                self.resetSection();
                return false;
            });

            $("#SearchInputBox").append(Lib.createTextBox("", "検索ワードを入力", "SearchKeyword"))
            .hover(openList, closeList);
            $("#SearchKeyword").on("keyup", this._search).on("change", this._search)
            .on("click", function () {
                closeList();
            });
            // 検索ボタン
            $("#SearchIcon").on("click", this._search);
            // ホームボタン
            $("#HomeIcon").on("click", function (e) {
                if (Manager.option.myList.length > 0) {
                    $("#SelectSectionList li[data-selected=true]").attr("data-selected", "false");
                    $("#SelectSectionList li[data-sectionType=myList]").attr("data-selected", "true");
                    self._changeSection();
                }
                return false;
            });
        },
        setKeyword: function (v, exec) {
            $("#SearchKeyword").val(v).change();
            if (exec) {
                this._search();
            }
        },
        _search: function () {
            var v = $("#SearchKeyword").val().toLowerCase().replace("　", " ").split(" ");
            ListItem.Reselect(function () {
                var selected = [];
                return $.map(Manager.List, function (s, i) {
                    var item = Lib.getProperty(s);
                    if ($.inArray(item.id, selected) > -1) { return; }
                    for (var j = 0, len = v.length; j < len; j++) {
                        if (!(
                            (item.id.toLowerCase().indexOf(v[j]) > -1) ||
                            (item.name.indexOf(v[j]) > -1) ||
                            (item.section.indexOf(v[j]) > -1) ||
                            (item.kana.indexOf(v[j]) > -1) ||
                            (item.phone.indexOf(v[j]) > -1) ||
                            (item.sectionCd.toLowerCase() == v[j]) ||
                            (item.rank.indexOf(v[j]) > -1)
                        )) {
                            return;
                        }
                    }
                    // 全てのキーワードにマッチ
                    selected.push(item.id);
                    return [s];
                });
            });
        }
    }

    // コンフィグ
    var Config = {
        MyList: {
            _init: false,

            // 該当者検索
            _searchId: function (inputId, dispName) {
                dispName.text("");
                var v = inputId.val();
                $.each(Manager.List, function (i, s) {
                    var item = Lib.getProperty(s);
                    if (item.id.toLowerCase() == v.toLowerCase()) {
                        dispName.text(item.name);
                        inputId.val(item.id);
                        return false;
                    }
                });
            },

            _create: function () {
                var self = this;
                var box = $("#ConfigMyList .inputBox");
                var add = function (val) {
                    val = val || "";
                    var inputId = $("<input />").addClass("inputId").val(val);
                    var dispName = $("<span></span>").addClass("dispName");
                    box.append($("<div></div>").addClass("inputLine")
                        .append($("<span></span>").text("社員番号：").addClass("title"))
                        .append(inputId)
                        .append(dispName)
                    );
                    if (val != "") {
                        self._searchId(inputId, dispName);
                    }
                }
                var remove = function () {
                    box.find(".inputLine").last().remove();
                }
                var checkInput = function () {
                    // ラストが入力されたら次のinputを追加する
                    var i = $("#ConfigMyList .inputBox input.inputId");
                    if (i.last().val() != "") {
                        add();
                    }
                    // ラスト２つ続けて空白なら片方削除する
                    while ((i.eq(-2).val() == "") && (i.last().val() == "")) {
                        remove();
                        i = $("#ConfigMyList .inputBox input.inputId");
                    }
                }
                // キャンセルボタン
                box.append(Lib.createButton("Cancel").addClass("cancel").on("click", function () {
                    $("#SelectSectionList li:not(.hidden)").first().trigger("click");
                }));
                // クリアボタン
                box.append(Lib.createButton("Clear").addClass("clear").on("click", function () {
                    $("#ConfigMyList .inputBox input.inputId").val("");
                    $("#ConfigMyList .inputBox span.dispName").text("");
                    checkInput();
                }));
                // 保存ボタン
                box.append(Lib.createButton("Save").addClass("save").on("click", function () {
                    var a = [];
                    $("#ConfigMyList .inputBox input.inputId").each(function (i, s) {
                        a.push($(s).val());
                    });
                    if (a[a.length - 1] == "") {
                        a.pop();
                    }
                    self._save(a);
                    $("#SelectSectionList li:not(.hidden)").first().trigger("click");
                }));
                // 現在表示コピーボタン
                box.append(Lib.createButton("現在のリストをデフォルトに追加する").addClass("copy").on("click", function () {
                    box.find(".inputLine").last().remove();
                    $("#ListPanel li .block-b .block-b-1").each(function () {
                        add($(this).text());
                    });
                    checkInput();
                }));

                var f = function () {
                    var t = $(this);
                    self._searchId(t, t.next());
                    checkInput();
                }

                box.on("change", "input", f).on("keyup", "input", f);
                this._init = true;

                // 初期化メソッド
                this._openIni = function () {
                    box.find(".inputLine").remove();
                    // 初期要素の追加
                    if (Manager.option.myList.length > 0) {
                        $.each(Manager.option.myList, function (i, s) {
                            add(s);
                        });
                    }
                    checkInput();
                }
            },

            _openIni: null,

            open: function () {
                if (!this._init) {
                    this._create();
                }
                // 初期化
                this._openIni();
                // オープン
                $("[data-panelType=mainContents]").exHide();
                $("#ConfigMyList").exShow();
                // マネージャーに登録
                Manager.startEdit();
            },

            _save: function (myList) {
                $.cookie("myList", myList.join("\n"), { expires: 365 });
                Manager.option.myList = myList;
                Search.resetSection();
            }
        },

        MySection: {
            _init: false,

            _create: function () {
                var self = this;
                var box = $("#ConfigMySection .buttonBox");
                // キャンセルボタン
                box.append(Lib.createButton("Cancel").addClass("cancel").on("click", function () {
                    $("#SelectSectionList li:not(.hidden)").first().trigger("click");
                }));
                // クリアボタン
                box.append(Lib.createButton("Clear").addClass("clear").on("click", function () {
                    $("#ConfigMySection .buttonBox a.button.section").removeClass("on");
                }));
                // 保存ボタン
                box.append(Lib.createButton("Save").addClass("save").on("click", function () {
                    var a = [];
                    $("#ConfigMySection .buttonBox a.button.section.on").each(function (i, s) {
                        a.push($(s).text());
                    });
                    self._save(a);
                    $("#SelectSectionList li:not(.hidden)").first().trigger("click");
                }));
                // 部署作成
                $.each(Manager.SectionList, function (i, s) {
                    box.append(Lib.createButton(s[0]).addClass("section"));
                });
                box.on("click", "a.button.section", function () {
                    var t = $(this);
                    if (t.hasClass("on")) {
                        t.removeClass("on");
                    } else {
                        t.addClass("on");
                    }
                });
                this._init = true;
            },

            open: function () {
                if (!this._init) {
                    this._create();
                }
                // 初期化
                $("#ConfigMySection .buttonBox a.button.section").each(function () {
                    var t = $(this).removeClass("on");
                    if ($.inArray(t.text(), Manager.option.mySection) > -1) {
                        t.addClass("on");
                    }
                });
                // オープン
                $("[data-panelType=mainContents]").exHide();
                $("#ConfigMySection").exShow();
                // マネージャーに登録
                Manager.startEdit();
            },

            _save: function (mySection) {
                $.cookie("mySection", mySection.join("\n"), { expires: 365 });
                Manager.option.mySection = mySection;
                Search.resetSection();
            }
        },

        Etc: {
            _init: false,

            _addConfirm: true,
            _addConfirmScr: "",
            _delConfirmScr: "EX.b(false);",

            _editMyScr: function () {
                var myScr = "";
                if (this._addConfirm) {
                    // デフォルト
                    $("#ConfigEtc .inputBox a.button.config.confirm.yes").addClass("on");
                    $("#ConfigEtc .inputBox a.button.config.confirm.no").removeClass("on");
                    myScr += this._addConfirmScr;
                } else {
                    $("#ConfigEtc .inputBox a.button.config.confirm.yes").removeClass("on");
                    $("#ConfigEtc .inputBox a.button.config.confirm.no").addClass("on");
                    myScr += this._delConfirmScr;
                }
                $("#ConfigEtc .inputBox textarea").val(myScr);
            },

            _create: function () {
                var self = this;
                var ta = $("#ConfigEtc .inputBox #ExScript");

                $("#ConfigEtc .inputBox")
                    .append(Lib.createButton("Cancel").addClass("cancel").on("click", function () {
                        $("#SelectSectionList li:not(.hidden)").first().trigger("click");
                    }))
                    .append(Lib.createButton("Save").addClass("save").on("click", function () {
                        $.cookie("myScr", ta.val(), { expires: 365 });
                        location.reload();
                    }))
                    .append($("<div></div>").addClass("title").text("更新時の確認メッセージの表示"))
                    .append(Lib.createButton("表示する").addClass("config confirm yes").on("click", function () {
                        self._addConfirm = true;
                        self._editMyScr();
                    }))
                    .append(Lib.createButton("表示しない").addClass("config confirm no").on("click", function () {
                        self._addConfirm = false; // デフォルト
                        self._editMyScr();
                    }))
                    .append($(ta));

                this._init = true;
            },

            open: function () {
                if (!this._init) {
                    this._create();
                }
                var myScr = $.cookie("myScr") || "";
                this._addConfirm = (myScr.indexOf(this._delConfirmScr) == -1);
                this._editMyScr();
                $("#ConfigEtc .inputBox textarea").val(myScr);

                $("[data-panelType=mainContents]").exHide();
                $("#ConfigEtc").exShow();
                // マネージャーに登録
                Manager.startEdit();
            }
        },
        init: function () {
            var self = this;
            var ul = $("#SelectConfigList");

            var openList = function () {
                ul.exShow();
                ul.stop(true).animate({ "height": "128px" }, "fast");
            }
            var closeList = function () {
                ul.animate({ "height": "0px" }, {
                    duration: "fast",
                    complete: function () {
                        ul.exHide();
                    }
                });
            }
            ul.on("click", "li[data-configType=myList]", function (e) {
                self.MyList.open();
                closeList();
                return false;
            })
            .on("click", "li[data-configType=mySection]", function (e) {
                self.MySection.open();
                closeList();
                return false;
            })
            .on("click", "li[data-configType=etc]", function (e) {
                self.Etc.open();
                closeList();
                return false;
            })
            .on("click", "li[data-configType=note]", function (e) {
                window.open("note.txt");
                return false;
            });
            $("#ConfigMenu").hover(openList, closeList);
        }
    }

    // ポップアップクラス
    var popup = function (main, type) {
        this._main = main;
        var self = this;

        main.on("click", "a.button.popupSelect", function () {
            self.commit($(this).text());
            return false;
        })
        .on("click", function () {
            self.close();
            return false;
        });

        if (type = "nichiji") {
            main.find("#selTimeSt, #selTimeEd").on("change", function () {
                var st = main.find("#selTimeSt").val();
                var ed = main.find("#selTimeEd").val();
                var txt = (st + ed != "") ? (st + "～" + ed) : "";
                main.find(".button.popupSelect").text(txt);
                return false;
            })
            .on("click", function () {
                return false;
            });

            this._clear = function () {
                main.find("#selTimeSt").val("");
                main.find("#selTimeEd").val("");
                main.find(".button.popupSelect").text("");
            }
        }
    }
    popup.prototype = {
        _main: null,
        _callBack: null,
        _clear: null,
        open: function (callBack) {
            this._callBack = callBack;
            this._main.exShow();
        },
        close: function () {
            this._main.exHide();
        },
        commit: function (text) {
            this._callBack(text);
            this.close();
        },
        clear: function () {
            if (this._clear) {
                this._clear();
            }
        }
    }

    // マネージャー
    var Manager = {
        List: [],
        List2: [],
        SectionList: [],

        PopupJotai: null,
        PopupYukisaki: null,
        PopupNichiji: null,

        option: {
            myList: [],
            mySection: [],
            exConfirm: true,
            exReselect: []
        },

        _editVal: {
            id: "",
            statusCd: "",
            jotai: "",
            yukisaki: "",
            nichiji: ""
        },
        _canceller: [],
        _stopReload: false,

        startEdit: function (canceller) {
            this.cancelEdit();
            if (canceller) {
                this._canceller.push(canceller);
            }
            this._stopReload = true;
        },
        cancelEdit: function () {
            while (this._canceller.length > 0) {
                this._canceller.pop()();
            }
            this._stopReload = false;
        },
        setAutoReload: function (interval) {
            var self = this;
            setInterval(function () {
                if (self._stopReload == false) {
                    self.reload();
                }
            }, interval);
        },
        concatList: function () {
            var self = this;
            this.List = $.map(this.List, function (s, i) {
                // map と each で受け取る引数違う
                var s2 = ["", "", "", "", "", "", "", "", ""];
                $.each(self.List2, function (j, t) {
                    if (s[0].toLowerCase() == (t[7] + "nnnnn").substr(0, 5).toLowerCase()) {
                        s2 = t;
                        return false;
                    }
                });

                return [s.concat(s2)]; // mapで二次元配列作成
            });
        },
        reload: function () {
            // test
            UpdateTime.waiting();
            this._stopReload = true;
            var self = this;
            setTimeout(function(){
                self.List = YUKISAKILIST;
                self.concatList();
                ListItem.Reselect();
                UpdateTime.refreshTime();
                self._stopReload = false;
            }, 500);
            return;

            UpdateTime.waiting();
            this._stopReload = true;
            var self = this;
            $.ajax({
                type: "POST",
                url: "WebService.asmx/GetYukisakiList",
                data: "{}",
                contentType: "application/json; charset=utf-8",
                success: function (t) {
                    self.List = t.d;
                    self.concatList();
                    ListItem.Reselect();
                    UpdateTime.refreshTime();
                    self._stopReload = false;
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log("textStatus: " + textStatus + ", errorThrown: " + errorThrown);
                }
            });
        },
        getSection: function (f) {
            // test
            this.SectionList = SECTIONLIST;
            f();
            return;

            this._stopReload = true;
            var self = this;
            $.ajax({
                type: "POST",
                url: "WebService.asmx/GetSectionList",
                data: "{}",
                contentType: "application/json; charset=utf-8",
                success: function (t) {
                    self.SectionList = t.d;
                    f();
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log("textStatus: " + textStatus + ", errorThrown: " + errorThrown);
                }
            });
        },
        _update: function () {
            this._stopReload = true;
            var self = this;
            $.ajax({
                type: "POST",
                url: "WebService.asmx/UpdateYukisaki",
                data: JSON.stringify({
                    UserID: this._editVal.id,
                    StatusCD: this._editVal.statusCd,
                    Jotai: this._editVal.jotai,
                    Yukisaki: this._editVal.yukisaki,
                    Nichiji: this._editVal.nichiji
                }),
                contentType: "application/json; charset=utf-8",
                success: function (t) {
                    self.reload();
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log("textStatus: " + textStatus + ", errorThrown: " + errorThrown);
                }
            });
        },
        setStatus: function (id, statusCd, jotai, yukisaki, nichiji) {
            this._editVal.id = id;
            this._editVal.statusCd = statusCd;
            this._editVal.jotai = jotai;
            this._editVal.yukisaki = yukisaki;
            this._editVal.nichiji = nichiji;
        },
        update: function (msg) {
            if (!msg && this.option.exConfirm) {
                var id = this._editVal.id;
                var name = "";
                $.each(Manager.List, function (i, s) {
                    var item = Lib.getProperty(s);
                    if (item.id == id) {
                        name = item.name;
                        return false;
                    }
                });
                msg = name + "(" + id + ") を更新しますか？";
            }
            if (!msg || confirm(msg)) {
                this._update();
            }
        },
        updateDirect: function (id, statusCd) {
            this.setStatus(id, statusCd, "", "", "");
            this.update();
        }
    }

    // オプションスクリプト
    var EX = {
        a: function () {
        },
        b: function (b) {
            Manager.option.exConfirm = b;
        }
    }

    // ここからページロード処理

    // デフォルト表示の設定
    var r = $.cookie("myList");
    if (r) {
        Manager.option.myList = r.split("\n");
    }
    // よく使う部署の設定
    var s = $.cookie("mySection");
    if (s) {
        Manager.option.mySection = s.split("\n");
    }

    // 初期化処理
    UpdateTime.init();
    ListItem.init();
    Config.init();
    Search.init();

    // ポップアップ
    Manager.PopupJotai = new popup($("#PopupJotaiMain"));
    Manager.PopupYukisaki = new popup($("#PopupYukisakiMain"));
    Manager.PopupNichiji = new popup($("#PopupNichijiMain"), "nichiji");

/* ここから */
            Manager.List2 = list;
            // 部署取得
            Manager.getSection(function () {
                Search.createSection();
                Manager.reload();
            });
return;
/* ここまで */

    // adsearchデータ取得
    $.ajax({
        type: "GET",
        url: "include/list.js",
        // url: "http://dolphin2.ndensan.co.jp/OTHER/adkensaku/list.js",
        dataType: "script",
        scriptCharset: "shift_jis",
        success: function () {
            Manager.List2 = list;
            // 部署取得
            Manager.getSection(function () {
                Search.createSection();
                Manager.reload();
                // 自動更新
                // Manager.setAutoReload(5 * 60 * 1000);
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("textStatus: " + textStatus + ", errorThrown: " + errorThrown);
        }
    });

    // カスタムスクリプト
    eval($.cookie("myScr") || "");
});