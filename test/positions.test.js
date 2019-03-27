const expect  = require('chai').expect;
const p = require('../modules/positions');

describe("when using position", function() {
    afterEach(()=> p.clear());
    it("preserves insertion order", function() {
        

        p.insert("books/author/book1/chap1.mp3",1,10);
        p.insert("books/author/book2/chap2.mp3", 2, 20);
        p.insert("books/author/book3/chap3.mp3", 3, 30);
        expect(p.size).to.equal(3);
        let r = p.getLast();
        
        expect(r.position).to.equal(30);
        expect(r.file).to.equal("chap3.mp3");

        p.insert("books/author/book1/chap4.mp3",4,40);
        r = p.getLast();
        expect(r.file).to.equal("chap4.mp3");

        r = p.get("books/author/book2");
        expect(r.timeStamp).to.equal(2);

    });
});