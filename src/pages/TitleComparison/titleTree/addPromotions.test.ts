import { addPromotions } from "./addPromotions";
import { fabric } from "fabric";
import { connect } from "./connect";
import { mocked } from "ts-jest/utils";
import { Title } from "../../../core/titles/Title";
import { titleFactory } from "./titleFactory";

jest.mock("./connect");
jest.mock("./titleFactory");

const fakeConnect = mocked(connect);
const fakeTitleFactory = mocked(titleFactory);

describe(`addPromotions`, () => {
    const itConnectsOnCanvas = (canvas: fabric.Canvas, from: fabric.Object, to: fabric.Object) =>
        it(`connects from to to on the canvas`, () => {
            expect(fakeConnect).toHaveBeenCalledWith(canvas, from, to);
        });

    const describePromotionsFrom = (title: Title) => {
        describe(`when there is an even number`, () => {
            it(`adds them alternating left and right above`, () => {

            });
        });

        describe(`when there is an odd number`, () => {
            it(`adds the first one straight above then alternates left and right above`, () => {

            });
        });

        describe(`when a promotion is the selected comparison`, () => {
            it(`is added in the comparison color`, () => {

            });

            it(`is unselectable`, () => {

            });
        });

        describe(`promotions that are not the selected comparison`, () => {
            it(`is added in the unselected color`, () => {

            });

            it(`is selectable`, () => {

            });
        });
    }

    describe(`promotions from the selected title`, () => {
        
    });

    describe(`promotions from an equivalent title`, () => {
        
    });
});