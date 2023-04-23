import "jest";

import TripService from '../src/trip/TripService'
import User from '../src/user/User'
import UserSession from "../src/user/UserSession";
import TripDAO from "../src/trip/TripDAO";
import UserNotLoggedInException from "../src/exception/UserNotLoggedInException";

describe('TripService', () => {

    it('should get the trips of a user if the person querying is a friend', () => {
        const user = new User();
        const personQuerying = new User();

        TripDAO.findTripsByUser = jest.fn()
        user.getFriends = jest.fn().mockReturnValue([personQuerying])

        UserSession.getLoggedUser = jest.fn().mockReturnValue(personQuerying);
        new TripService().getTripsByUser(user);

        expect(TripDAO.findTripsByUser).toBeCalledWith(user)
    });

    it('should return none of the user trips if the person querying is not a friend', () => {
        const user = new User();
        const personQuerying = new User();

        TripDAO.findTripsByUser = jest.fn()

        UserSession.getLoggedUser = jest.fn().mockReturnValue(personQuerying);
        const tripList = new TripService().getTripsByUser(user);

        expect(TripDAO.findTripsByUser).not.toHaveBeenCalled();
        expect(tripList).toEqual([])
    });

    it('should throw a UserNotLoggedIn exception if the person querying is not logged in', () => {
        const user = new User();
        const personQuerying = null;

        TripDAO.findTripsByUser = jest.fn()

        UserSession.getLoggedUser = jest.fn().mockReturnValue(personQuerying);

        expect(() => new TripService().getTripsByUser(user)).toThrow(UserNotLoggedInException);
    });
});

